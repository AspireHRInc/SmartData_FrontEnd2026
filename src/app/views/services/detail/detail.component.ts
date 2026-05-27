import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServicesService } from 'src/app/services/services.service';
import { ServiceSetupService } from 'src/app/services/service-setup.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ss-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class DetailComponent implements OnInit, OnDestroy {
  loggedInUserObj$: Observable<User> = this.userService.loggedInUserObj$;
  showCreateNewRun = true;
  currentServiceId = '';
  currentServiceName = '';
  processDetails: any = null;

  private routeSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private servicesService: ServicesService,
    private serviceSetupService: ServiceSetupService,
    private _location: Location,
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    // Subscribe to route params — fires every time the :id changes
    this.routeSub = this.route.params.subscribe(params => {
      const rawId = params['id'];
      this.currentServiceId = rawId;

      // Guard against data not loaded yet
      if (this.servicesService.allServices.length && this.servicesService.allServices[0]?.services) {
        const found = this.servicesService.allServices[0].services.find(
          (service: any) => service.id === this.currentServiceId.toString()
        );
        if (found) {
          this.currentServiceName = found.name;
        }
      }

      // Strip the SK prefix if present (e.g., "ScheduledProcess#uuid" → "uuid")
      const id = rawId.includes('#')
        ? rawId.split('#')[1]
        : rawId;

      // Fetch the process details (ScheduledProcess data)
      this.servicesService.getProcessDetails(id).subscribe(
        (response: any) => {
          console.log('Process details:', response);
          this.processDetails = response;

          const items = response.Items || [];
          if (items.length > 0) {
            const processItem = items[0];
            console.log('Process item:', processItem);
            console.log('Input parameters:', processItem.inputParameters);

            // Check if we need to fetch parameters from the PTV
            const ptvRef = processItem.processTypeSSObjectKey?.ssObjectKey
                        || processItem.referencedObjects?.ssObjectKey;

            const hasLocalParams = processItem.inputParameters && processItem.inputParameters.length > 0;

            if (!hasLocalParams && ptvRef && ptvRef.includes('PTV#')) {
              // Pass the FULL ssObjectKey — the Lambda needs it to build the correct SK
              console.log('Fetching PTV for parameters, ssObjectKey:', ptvRef);

              this.servicesService.getProcessTypeVersion(ptvRef).subscribe(
                (ptvResponse: any) => {
                  console.log('PTV response:', ptvResponse);
                  const ptvItems = ptvResponse.Items || [];
                  if (ptvItems.length > 0) {
                    const ptvItem = ptvItems[0];
                    console.log('PTV inputParameters:', ptvItem.inputParameters);

                    // Merge: use PTV's inputParameters on the process item
                    const merged = {
                      ...processItem,
                      inputParameters: ptvItem.inputParameters || []
                    };
                    this.serviceSetupService.loadServiceSetup(merged);
                  } else {
                    console.warn('No PTV items found for ssObjectKey:', ptvRef);
                    this.serviceSetupService.loadServiceSetup(processItem);
                  }
                },
                (error: any) => {
                  console.error('Error fetching PTV:', error);
                  // Fall back to whatever is on the ScheduledProcess
                  this.serviceSetupService.loadServiceSetup(processItem);
                }
              );
            } else {
              // Parameters exist on the ScheduledProcess item directly (e.g., HeartBeat)
              this.serviceSetupService.loadServiceSetup(processItem);
            }
          } else {
            console.warn('No ScheduledProcess items found for ID:', id);
          }
        },
        (error: any) => {
          console.error('Error fetching process details:', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}


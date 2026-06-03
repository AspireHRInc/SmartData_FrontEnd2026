import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServicesService } from 'src/app/services/services.service';
import { ServiceSetupService } from 'src/app/services/service-setup.service';
import { ServiceRunService } from 'src/app/services/service-run.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';

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
  private lastLoadedSlug = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private servicesService: ServicesService,
    private serviceSetupService: ServiceSetupService,
    private serviceRunService: ServiceRunService,
    private _location: Location,
    public uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const slug = params['id'];

      // ONLY re-fetch if the slug actually changed
      if (this.lastLoadedSlug === slug) {
        return;
      }
      this.lastLoadedSlug = slug;

      // Wait for services to be loaded before resolving the slug
      this.waitForServicesAndLoad(slug);
    });
  }

  private waitForServicesAndLoad(slug: string): void {
    // If services are already loaded, resolve immediately
    if (this.servicesService.allServices.length > 0 && this.servicesService.allServices[0]?.services?.length > 0) {
      this.resolveAndLoad(slug);
      return;
    }

    // Otherwise, wait for the services to load (poll via servicesService)
    // The servicesService loads on init — we just need to wait for it
    const checkInterval = setInterval(() => {
      if (this.servicesService.allServices.length > 0 && this.servicesService.allServices[0]?.services?.length > 0) {
        clearInterval(checkInterval);
        this.resolveAndLoad(slug);
      }
    }, 100);

    // Safety timeout — if services don't load within 5 seconds, try with raw slug
    setTimeout(() => {
      clearInterval(checkInterval);
      if (!this.currentServiceId || this.currentServiceId === slug) {
        console.warn('Services did not load in time, attempting with raw slug:', slug);
        this.resolveAndLoad(slug);
      }
    }, 5000);
  }

  private resolveAndLoad(slug: string): void {
    // Resolve slug to actual service ID and name
    let resolvedId = slug;
    let resolvedName = '';

    if (this.servicesService.allServices.length && this.servicesService.allServices[0]?.services) {
      // First try to match by slug (name-based URL)
      const foundBySlug = this.servicesService.allServices[0].services.find(
        (service: any) => service.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      );

      if (foundBySlug) {
        resolvedId = foundBySlug.id;
        resolvedName = foundBySlug.name;
      } else {
        // Try exact name match (case-insensitive)
        const foundByName = this.servicesService.allServices[0].services.find(
          (service: any) => service.name.toLowerCase() === slug.toLowerCase()
        );

        if (foundByName) {
          resolvedId = foundByName.id;
          resolvedName = foundByName.name;
        } else {
          // Fallback: try to match by raw ID (for backwards compatibility with UUID URLs)
          const foundById = this.servicesService.allServices[0].services.find(
            (service: any) => service.id === slug || service.id.includes(slug)
          );
          if (foundById) {
            resolvedId = foundById.id;
            resolvedName = foundById.name;
          }
        }
      }
    }

    this.currentServiceId = resolvedId;
    this.currentServiceName = resolvedName;

    // Strip the SK prefix if present (e.g., "ScheduledProcess#uuid" → "uuid")
    const id = resolvedId.includes('#')
      ? resolvedId.split('#')[1]
      : resolvedId;

    console.log('Resolved slug:', slug, '→ ID:', id, '→ Name:', resolvedName);

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

          // Set the service name for history filtering
          const processName = processItem.name || this.currentServiceName || '';
          this.currentServiceName = processName;
          this.serviceRunService.currentServiceName = processName;
          this.serviceRunService.currentServiceRunsId = this.currentServiceId;

          // Check if we need to fetch parameters from the PTV
          const ptvRef = processItem.processTypeSSObjectKey?.ssObjectKey
                      || processItem.referencedObjects?.ssObjectKey;

          const hasLocalParams = processItem.inputParameters && processItem.inputParameters.length > 0;

          if (!hasLocalParams && ptvRef && ptvRef.includes('PTV#')) {
            console.log('Fetching PTV for parameters, ssObjectKey:', ptvRef);

            this.servicesService.getProcessTypeVersion(ptvRef).subscribe(
              (ptvResponse: any) => {
                console.log('PTV response:', ptvResponse);
                const ptvItems = ptvResponse.Items || [];
                if (ptvItems.length > 0) {
                  const ptvItem = ptvItems;
                  console.log('PTV inputParameters:', ptvItem.inputParameters);

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
                this.serviceSetupService.loadServiceSetup(processItem);
              }
            );
          } else {
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
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}

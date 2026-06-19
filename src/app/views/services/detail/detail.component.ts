import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { UserService, User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServicesService } from 'src/app/services/services.service';
import { ServiceSetupService } from 'src/app/services/service-setup.service';
import { ServiceRunService } from 'src/app/services/service-run.service';
import { Observable, Subscription, Subject, interval } from 'rxjs';
import { filter, take, takeUntil, first } from 'rxjs/operators';

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
  private destroy$ = new Subject<void>();

  // Cache the loaded process item so child routes can re-read it without re-fetching
  private loadedProcessItem: any = null;

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
    this.routeSub = this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const slug = params['id'];

        // ONLY re-fetch if the slug actually changed
        if (this.lastLoadedSlug === slug) {
          return;
        }
        this.lastLoadedSlug = slug;

        this.waitForServicesAndLoad(slug);
      });
  }

  private waitForServicesAndLoad(slug: string): void {
    // If services are already loaded, resolve immediately
    if (this.areServicesReady()) {
      this.resolveAndLoad(slug);
      return;
    }

    // Poll for services to be ready, but with proper cleanup
    interval(100)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => this.areServicesReady()),
        first()
      )
      .subscribe(() => {
        this.resolveAndLoad(slug);
      });

    // Safety timeout
    setTimeout(() => {
      if (!this.loadedProcessItem) {
        console.warn('Services did not load in time, attempting with raw slug:', slug);
        this.resolveAndLoad(slug);
      }
    }, 5000);
  }

  private areServicesReady(): boolean {
    return this.servicesService.allServices.length > 0
      && this.servicesService.allServices[0]?.services?.length > 0;
  }

  private resolveAndLoad(slug: string): void {
    let resolvedId = slug;
    let resolvedName = '';

    if (this.areServicesReady()) {
      const services = this.servicesService.allServices[0].services;

      // First try to match by slug (name-based URL)
      const foundBySlug = services.find(
        (service: any) => service.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase()
      );

      if (foundBySlug) {
        resolvedId = foundBySlug.id;
        resolvedName = foundBySlug.name;
      } else {
        // Try exact name match (case-insensitive)
        const foundByName = services.find(
          (service: any) => service.name.toLowerCase() === slug.toLowerCase()
        );

        if (foundByName) {
          resolvedId = foundByName.id;
          resolvedName = foundByName.name;
        } else {
          // Fallback: try to match by raw ID
          const foundById = services.find(
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

    const id = resolvedId.includes('#')
      ? resolvedId.split('#')[1]
      : resolvedId;

    console.log('Resolved slug:', slug, '→ ID:', id, '→ Name:', resolvedName);

    this.servicesService.getProcessDetails(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response: any) => {
          console.log('Process details:', response);
          this.processDetails = response;

          const items = response.Items || [];
          if (items.length > 0) {
            const processItem = items[0];
            console.log('Process item:', processItem);
            console.log('Input parameters:', processItem.inputParameters);

            const processName = processItem.name || this.currentServiceName || '';
            this.currentServiceName = processName;
            this.serviceRunService.currentServiceName = processName;
            this.serviceRunService.currentServiceRunsId = this.currentServiceId;

            const ptvRef = processItem.processTypeSSObjectKey?.ssObjectKey
                        || processItem.referencedObjects?.ssObjectKey;

            const hasLocalParams = processItem.inputParameters && processItem.inputParameters.length > 0;

            if (!hasLocalParams && ptvRef && ptvRef.includes('PTV#')) {
              console.log('Fetching PTV for parameters, ssObjectKey:', ptvRef);

              this.servicesService.getProcessTypeVersion(ptvRef)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (ptvResponse: any) => {
                    console.log('PTV response:', ptvResponse);
                    const ptvItems = ptvResponse.Items || [];
                    if (ptvItems.length > 0) {
                      // FIX: was `ptvItems` (the array), must be `ptvItems[0]` (first item)
                      const ptvItem = ptvItems[0];
                      console.log('PTV inputParameters:', ptvItem.inputParameters);

                      const merged = {
                        ...processItem,
                        inputParameters: ptvItem.inputParameters || []
                      };
                      this.loadedProcessItem = merged;
                      this.serviceSetupService.loadServiceSetup(merged);
                    } else {
                      console.warn('No PTV items found for ssObjectKey:', ptvRef);
                      this.loadedProcessItem = processItem;
                      this.serviceSetupService.loadServiceSetup(processItem);
                    }
                  },
                  (error: any) => {
                    console.error('Error fetching PTV:', error);
                    this.loadedProcessItem = processItem;
                    this.serviceSetupService.loadServiceSetup(processItem);
                  }
                );
            } else {
              this.loadedProcessItem = processItem;
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

  /**
   * Called by child components (e.g., SetupComponent) if they need to
   * re-trigger the setup load without a full re-fetch.
   */
  reloadSetup(): void {
    if (this.loadedProcessItem) {
      this.serviceSetupService.unlockSetup();
      this.serviceSetupService.loadServiceSetup(this.loadedProcessItem);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}


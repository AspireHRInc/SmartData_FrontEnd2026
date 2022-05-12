import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private serviceDetailOpen = new BehaviorSubject<boolean>(false);
  serviceDetailOpen$ = this.serviceDetailOpen.asObservable();

  private serviceFiltersOpen = new BehaviorSubject<boolean>(false);
  serviceFiltersOpen$ = this.serviceFiltersOpen.asObservable();

  private serviceDetailId = new BehaviorSubject<string>('');
  serviceDetailId$ = this.serviceDetailId.asObservable();

  private cancelServiceRunOpen = new BehaviorSubject<boolean>(false);
  cancelServiceRunOpen$ = this.cancelServiceRunOpen.asObservable();

  // private cancelServiceRunId = new BehaviorSubject<string>('');
  // cancelServiceRunId$ = this.cancelServiceRunId.asObservable();

  private serviceRunResultsOpen = new BehaviorSubject<boolean>(false);
  serviceRunResultsOpen$ = this.serviceRunResultsOpen.asObservable();

  private serviceRunInfoOpen = new BehaviorSubject<boolean>(false);
  serviceRunInfoOpen$ = this.serviceRunInfoOpen.asObservable();

  constructor() {}

  showServiceDetail() {
    this.serviceDetailOpen.next(true);
  }

  hideServiceDetail() {
    this.serviceDetailOpen.next(false);
  }

  setIdServiceDetailId(id: string) {
    console.log('set detail id', id);
    this.serviceDetailId.next(id);
  }

  showServiceFilters() {
    this.serviceFiltersOpen.next(true);
  }

  hideServiceFilters() {
    this.serviceFiltersOpen.next(false);
  }

  showCancelServiceRun() {
    this.cancelServiceRunOpen.next(true);
  }

  hideCancelServiceRun() {
    this.cancelServiceRunOpen.next(false);
  }

  // setCancelServiceRunId(searchString: string) {
  //   this.cancelServiceRunId.next(searchString);
  // }

  showServiceRunResults() {
    this.serviceRunResultsOpen.next(true);
  }

  hideServiceRunResults() {
    this.serviceRunResultsOpen.next(false);
  }

  showServiceRunInfo() {
    this.serviceRunInfoOpen.next(true);
  }

  hideServiceRunInfo() {
    this.serviceRunInfoOpen.next(false);
  }
}

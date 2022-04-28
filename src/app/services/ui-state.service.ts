import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private serviceDetailOpen = new BehaviorSubject<boolean>(true);
  serviceDetailOpen$ = this.serviceDetailOpen.asObservable();

  private serviceFiltersOpen = new BehaviorSubject<boolean>(false);
  serviceFiltersOpen$ = this.serviceFiltersOpen.asObservable();

  private serviceDetailId = new BehaviorSubject<string>('');
  serviceDetailId$ = this.serviceDetailId.asObservable();

  // private serviceSearchString = new BehaviorSubject<string>('');
  // serviceSearchString$ = this.serviceSearchString.asObservable();

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

  // setServiceSearchString(searchString: string) {
  //   console.log('set service search string', searchString);
  //   this.serviceSearchString.next(searchString);
  // }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiStateService {
  private serviceDetailOpen = new BehaviorSubject<boolean>(true);
  serviceDetailOpen$ = this.serviceDetailOpen.asObservable();

  private serviceFiltersOpen = new BehaviorSubject<boolean>(true);
  serviceFiltersOpen$ = this.serviceFiltersOpen.asObservable();

  private serviceDetailId = new BehaviorSubject<string>('');
  serviceDetailId$ = this.serviceDetailId.asObservable();

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
    // TODO: Show service filter modal
    console.log('service filters open');
    this.serviceFiltersOpen.next(true);
  }

  hideServiceFilters() {
    this.serviceDetailOpen.next(false);
  }
}

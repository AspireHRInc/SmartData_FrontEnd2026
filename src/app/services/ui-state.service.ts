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

  private serviceRunResultsOpen = new BehaviorSubject<boolean>(false);
  serviceRunResultsOpen$ = this.serviceRunResultsOpen.asObservable();

  private serviceRunInfoOpen = new BehaviorSubject<boolean>(false);
  serviceRunInfoOpen$ = this.serviceRunInfoOpen.asObservable();

  // When a form is in a dirty state but not saved, confirm naviate away
  private unsavedFormPreventNavigate = new BehaviorSubject<boolean>(false);
  unsavedFormPreventNavigate$ = this.unsavedFormPreventNavigate.asObservable();

  // When a form that is currently being edited is abandoned. Added to allow server to flush file cache
  private abandonCurrentForm = new BehaviorSubject<null>(null);
  abandonCurrentForm$ = this.abandonCurrentForm.asObservable();

  private menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this.menuOpen.asObservable();

  private confirmUserGroupDeleteOpen = new BehaviorSubject<boolean>(false);
  confirmUserGroupDeleteOpen$ = this.confirmUserGroupDeleteOpen.asObservable();

  // private currentUserGroupDeleteId = new BehaviorSubject<string>('');
  // currentUserGroupDeleteId$ = this.currentUserGroupDeleteId.asObservable();

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

  getIdServiceDetailId(): string {
    let current = '';
    this.serviceDetailId$.subscribe(event => {
      current = event;
    });
    return current;
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

  setUnsavedFormPreventNavigate(current: boolean) {
    this.unsavedFormPreventNavigate.next(current);
  }

  getUnsavedFormPreventNavigate(): boolean {
    let current: boolean = true;
    this.unsavedFormPreventNavigate$.subscribe(event => {
      current = event;
    });
    return current;
  }

  onAbandonCurrentForm() {
    this.abandonCurrentForm.next(null);
  }

  toggleMenu(state: boolean) {
    this.menuOpen.next(state);
  }

  closeMenu() {
    this.menuOpen.next(false);
  }

  openMenu() {
    this.menuOpen.next(true);
  }

  showConfirmUserGroupDelete() {
    this.confirmUserGroupDeleteOpen.next(true);
  }

  hideConfirmUserGroupDelete() {
    this.confirmUserGroupDeleteOpen.next(false);
  }

  // setCurrentUserGroupDeleteId(id: string) {
  //   console.log('ser user group delete', id);
  //   this.currentUserGroupDeleteId.next(id);
  // }
}

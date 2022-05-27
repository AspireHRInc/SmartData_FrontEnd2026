import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { UiStateService } from 'src/app/services/ui-state.service';

export interface CanComponentDeactivate {
  // canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})

// export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private uiState: UiStateService) {}

  canDeactivate(
    component: CanComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // console.log('canDeactivate');
    this.uiState.onAbandonCurrentForm();
    if (this.uiState.getUnsavedFormPreventNavigate()) {
      this.uiState.setUnsavedFormPreventNavigate(
        !confirm('Your process has not been submitted. Are you sure you want to leave?')
      );
    }

    return !this.uiState.getUnsavedFormPreventNavigate();
  }
}

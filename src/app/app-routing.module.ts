import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { ServicesComponent } from './views/services/services.component';
import { SetupComponent } from './views/services/detail/setup/setup.component';
import { DetailComponent } from './views/services/detail/detail.component';
import { ConfirmComponent } from './views/services/detail/confirm/confirm.component';
import { HistoryComponent } from './views/shared/history/history.component';
import { DashboardComponent } from './views/services/dashboard/dashboard.component';

import { AuthGuard } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

// routes that can be navigated to from /setup and /confirm need to use canDeactivate
// https://github.com/angular/angular/issues/12382

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'services', redirectTo: 'services/dashboard', pathMatch: 'full' },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    children: [
      { path: 'history', component: HistoryComponent, canDeactivate: [CanDeactivateGuard] },
      {
        path: ':id/detail',
        component: DetailComponent,
        canDeactivate: [CanDeactivateGuard],
        children: [
          {
            path: 'setup',
            component: SetupComponent,
            canDeactivate: [CanDeactivateGuard],
            runGuardsAndResolvers: 'always',
          },
          { path: 'confirm', component: ConfirmComponent, canDeactivate: [CanDeactivateGuard] },
          { path: 'history', component: HistoryComponent, canDeactivate: [CanDeactivateGuard] },
        ],
      },
      { path: 'dashboard', component: DashboardComponent, canDeactivate: [CanDeactivateGuard] },
    ],
  },
  // { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'requestAccount', component: RequestAccountComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

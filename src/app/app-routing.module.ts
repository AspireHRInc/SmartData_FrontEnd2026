import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { ServicesComponent } from './views/services/services.component';
import { SetupComponent } from './views/services/detail/setup/setup.component';
import { DetailComponent } from './views/services/detail/detail.component';
import { ConfirmComponent } from './views/services/detail/confirm/confirm.component';
import { HistoryComponent } from './views/shared/history/history.component';
import { DashboardComponent } from './views/services/dashboard/dashboard.component';
import { AdminComponent } from './views/admin/admin.component';

import { AuthGuard } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';

// routes that can be navigated to from /setup and /confirm need to use canDeactivate
// https://github.com/angular/angular/issues/12382

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'services', redirectTo: 'services/dashboard', pathMatch: 'full' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard] },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: 'history',
        component: HistoryComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { title: 'Services History' },
      },
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
            data: { title: 'Service Setup' },
          },
          {
            path: 'confirm',
            component: ConfirmComponent,
            canDeactivate: [CanDeactivateGuard],
            data: { title: 'Confirm Service Setup' },
          },
          {
            path: 'history',
            component: HistoryComponent,
            canDeactivate: [CanDeactivateGuard],
            data: { title: 'Service History' },
          },
        ],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canDeactivate: [CanDeactivateGuard],
        data: { title: 'Services Dashboard' },
      },
    ],
  },
  // { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'requestAccount', component: RequestAccountComponent},
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

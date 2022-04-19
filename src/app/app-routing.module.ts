import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { ServicesComponent } from './views/services/services.component';
import { SetupComponent } from './views/services/detail/setup/setup.component';
import { DetailComponent } from './views/services/detail/detail.component';
import { ConfirmComponent } from './views/services/detail/confirm/confirm.component';
import { HistoryComponent } from './views/services/detail/history/history.component';
import { DashboardComponent } from './views/services/dashboard/dashboard.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'one', component: PageOneComponent },
  // { path: 'two', component: PageTwoComponent },
  // { path: 'three', component: PageThreeComponent },

  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: ':id/detail',
        component: DetailComponent,
        children: [
          { path: 'setup', component: SetupComponent },
          { path: 'confirm', component: ConfirmComponent },
          { path: 'history', component: HistoryComponent },
        ],
      },
      { path: 'dashboard', component: DashboardComponent },
    ],
  },
  // { path: 'forgotPassword', component: ForgotPasswordComponent },
  // { path: 'requestAccount', component: RequestAccountComponent},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

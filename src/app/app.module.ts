// ANGULAR
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3RD PARTY
// import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { ComponentsModules } from './components/components.modules';
import { AppComponent } from './app.component';

// MOCK BACKEND FOR UPLOADS_MODULE
// ! REMOVE FOR PRODUCTION
import { UploadInterceptorService } from './services/upload-interceptor.service';

// VIEWS
import { LoginComponent } from './views/login/login.component';
import { ServicesComponent } from './views/services/services.component';
import { SetupComponent } from './views/services/detail/setup/setup.component';
import { ConfirmComponent } from './views/services/detail/confirm/confirm.component';
import { HistoryComponent } from './views/shared/history/history.component';
import { DetailComponent } from './views/services/detail/detail.component';
import { DashboardComponent } from './views/services/dashboard/dashboard.component';

import { CancelServiceRunComponent } from './views/shared/history/cancel-service-run/cancel-service-run.component';
import { ServiceRunResultsComponent } from './views/shared/history/service-run-results/service-run-results.component';
import { ServiceRunInfoComponent } from './views/shared/history/service-run-info/service-run-info.component';
import { ServiceDetailComponent } from './views/shared/service-detail/service-detail.component';
import { NavigationComponent } from './views/services/detail/navigation/navigation.component';
import { AdminComponent } from './views/admin/admin.component';
import { UsersComponent } from './views/admin/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ServicesComponent,
    SetupComponent,
    ConfirmComponent,
    HistoryComponent,
    DetailComponent,
    DashboardComponent,
    CancelServiceRunComponent,
    ServiceRunResultsComponent,
    ServiceRunInfoComponent,
    ServiceDetailComponent,
    NavigationComponent,
    AdminComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

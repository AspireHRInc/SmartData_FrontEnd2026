// ANGULAR
import { NgModule, ElementRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3RD PARTY

import { AppRoutingModule } from './app-routing.module';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// MODULES
import { RestModule } from './rest.module';

// COMPONENTS
import { ComponentsModules } from './components/components.modules';
import { AppComponent } from './app.component';
import { AiChatComponent } from './components/ai-chat/ai-chat.component';

// INTERCEPTORS
import { UploadInterceptorService } from './services/upload-interceptor.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

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
import { NavigationComponent } from './views/services/detail/navigation/navigation.component';
import { AdminComponent } from './views/admin/admin.component';
import { UsersComponent } from './views/admin/users/users.component';
import { RemoveGroupConfirmComponent } from './views/admin/remove-group-confirm/remove-group-confirm.component';
import { UserDetailComponent } from './views/admin/user-detail/user-detail.component';
import { SessionExpiredComponent } from './components/session-expired/session-expired.component';
import { NotificationModule, NOTIFICATION_CONTAINER } from '@progress/kendo-angular-notification';

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
    NavigationComponent,
    AdminComponent,
    UsersComponent,
    RemoveGroupConfirmComponent,
    UserDetailComponent,
    SessionExpiredComponent,
    AiChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModules,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RestModule,
    NotificationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: NOTIFICATION_CONTAINER,
      useFactory: () => {
        return { nativeElement: document.body } as ElementRef;
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

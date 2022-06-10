import { Component, OnInit, ViewChild, TemplateRef, Input, ViewContainerRef } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { NotificationService, NotificationRef } from '@progress/kendo-angular-notification';

@Component({
  selector: 'ss-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less'],
})
export class NotificationComponent implements OnInit {
  message = '';
  notificationRef!: NotificationRef;

  notificationRefList: NotificationRef[] = [];

  @Input() viewContainerRef!: ViewContainerRef;

  @ViewChild('template', { read: TemplateRef })
  public notificationTemplate!: TemplateRef<unknown>;

  constructor(public uiState: UiStateService, private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.uiState.errorNotification$.subscribe(errorMessage => {
      console.log('trigg');
      this.message = errorMessage;
      if (errorMessage !== '') {
        this.showError(errorMessage);
      }
    });
  }

  public showError(notificationText: string): void {
    this.notificationRef = this.notificationRef = this.notificationService.show({
      content: this.notificationTemplate,
      hideAfter: 3000,
      position: { horizontal: 'center', vertical: 'bottom' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'error', icon: true },
      closable: true,
    });
    this.notificationRefList.push(this.notificationRef);
  }

  showErrorUI() {
    this.uiState.setErrorNotification('new error ' + String(new Date()));
  }

  close() {
    this.notificationRefList[this.notificationRefList.length - 1].hide();
    this.notificationRefList.pop();
    // this.notificationRef.hide();
  }
}

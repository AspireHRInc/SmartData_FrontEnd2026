import { Component, OnInit } from '@angular/core';

import { ServiceSetupService } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less'],
})
export class ConfirmComponent implements OnInit {
  currentSetup: [string, unknown][] = [];

  constructor(public serviceSetup: ServiceSetupService, private uiState: UiStateService) {}

  ngOnInit(): void {
    this.currentSetup = Object.entries(this.serviceSetup.currenctServiceSetup);
  }

  showInfo() {
    this.uiState.showServiceDetail();
  }

  submit() {
    this.serviceSetup;
  }
}

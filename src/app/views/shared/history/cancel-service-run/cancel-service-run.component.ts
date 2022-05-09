import { Component, OnInit, Input } from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService } from 'src/app/services/service-run.service';

@Component({
  selector: 'ss-cancel-service-run',
  templateUrl: './cancel-service-run.component.html',
  styleUrls: ['./cancel-service-run.component.less'],
})
export class CancelServiceRunComponent implements OnInit {
  @Input() serviceId = '';

  close(): void {
    this.uiState.hideCancelServiceRun();
  }

  constructor(public uiState: UiStateService, private serviceRunService: ServiceRunService) {}

  ngOnInit(): void {}

  cancel() {
    this.serviceRunService.cancelServiceRun(this.serviceId);
    this.uiState.hideCancelServiceRun();
  }
}

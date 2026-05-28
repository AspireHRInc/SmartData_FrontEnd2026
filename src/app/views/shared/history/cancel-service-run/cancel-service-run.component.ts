import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService, ServiceRun } from 'src/app/services/service-run.service';

@Component({
  selector: 'ss-cancel-service-run',
  templateUrl: './cancel-service-run.component.html',
  styleUrls: ['./cancel-service-run.component.less'],
})
export class CancelServiceRunComponent implements OnInit, OnChanges {
  @Input() serviceId = '';
  serviceRun: ServiceRun | null = null;
  canceling = false;

  close(): void {
    this.uiState.hideCancelServiceRun();
  }

  constructor(public uiState: UiStateService, private serviceRunService: ServiceRunService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serviceId'] && this.serviceId) {
      console.log('Cancel dialog - serviceId changed to:', this.serviceId);
      console.log('Available runs:', this.serviceRunService.serviceRuns.map(r => r.id));
      this.serviceRun = this.serviceRunService.serviceRuns.find(run => run.id === this.serviceId) || null;
      console.log('Cancel dialog opened for run:', this.serviceRun);
    }
  }

  cancel(): void {
    if (!this.serviceRun) {
      console.error('No service run selected');
      return;
    }
    
    this.canceling = true;
    this.serviceRunService.cancelServiceRun(this.serviceId).subscribe({
      next: () => {
        console.log('Process canceled successfully');
        this.closeDialog();
      },
      error: (error: any) => {
        console.error('Error canceling process:', error);
        // Close dialog anyway — the cancel request was sent
        this.closeDialog();
      }
    });
  }

  private closeDialog(): void {
    this.canceling = false;
    this.uiState.hideCancelServiceRun();
    this.serviceRunService.refresh();
  }
}

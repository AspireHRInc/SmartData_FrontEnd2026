import { Component, OnInit, Input } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { ServiceRunService } from 'src/app/services/service-run.service';

@Component({
  selector: 'ss-service-run-results',
  templateUrl: './service-run-results.component.html',
  styleUrls: ['./service-run-results.component.less'],
})
export class ServiceRunResultsComponent implements OnInit {
  @Input() serviceId = '';
  results: any;

  close(): void {
    this.uiState.hideServiceRunResults();
  }

  constructor(public uiState: UiStateService, private serviceRunService: ServiceRunService) {}

  ngOnInit(): void {
    this.results = this.serviceRunService.serviceRuns.filter(serviceRun => serviceRun.id === this.serviceId)[0].results;
    console.log(this.results);
  }

  cancel() {
    this.uiState.hideCancelServiceRun();
  }

  onButtonClick(filePath: string) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../../..' + filePath);
    link.setAttribute('download', `RRpreviewsample.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

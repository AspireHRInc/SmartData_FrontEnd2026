import { Component, OnInit } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { ServicesService, Service } from 'src/app/services/services.service';

@Component({
  selector: 'ss-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.less'],
})
export class ServiceDetailComponent implements OnInit {
  serviceId = '0';
  constructor(private uiState: UiStateService, public services: ServicesService) {}
  service: Service = new Service();

  ngOnInit(): void {
    this.serviceId = this.uiState.getIdServiceDetailId();
    this.service = this.services.getServiceById(this.serviceId);
  }

  detailsClose() {
    this.uiState.hideServiceDetail();
  }

  requestService(serviceId: string) {
    this.services.requestService(serviceId);
  }

  downloadTemplate(filePath?: string, id?: string) {
    this.services.getServiceById(id!);
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../../..' + filePath);
    link.setAttribute('download', `RRpreviewsample.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  templateInformation(serviceId: string) {}
}

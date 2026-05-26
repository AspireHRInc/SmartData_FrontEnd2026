import { Component, OnInit } from '@angular/core';
import { ServicesService, ServiceCategory } from '../../services/services.service';

@Component({
  selector: 'ss-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less'],
})
export class ServicesComponent implements OnInit {
  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService.initialize();
  }

  get services(): ServiceCategory[] {
    return this.servicesService.getServices();
  }
}

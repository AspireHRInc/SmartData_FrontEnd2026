import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Service } from 'src/app/services/services.service';

@Component({
  selector: 'ss-tiles-tile',
  templateUrl: './tiles-tile.component.html',
  styleUrls: ['./tiles-tile.component.less'],
})
export class TilesTileComponent implements OnInit {
  @Input() service: Service = new Service();
  @Input() larger = false;

  @HostListener('click', ['this.service.name']) click(event: string) {
    console.log(event);
  }
  constructor() {}

  ngOnInit(): void {}
}

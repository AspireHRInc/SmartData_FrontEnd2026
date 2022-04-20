import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceCategory } from 'src/app/services/services.service';

@Component({
  selector: 'ss-tiles-section',
  templateUrl: './tiles-section.component.html',
  styleUrls: ['./tiles-section.component.less'],
  host: { class: 'section' },
})
export class TilesSectionComponent implements OnInit {
  @Input() data: ServiceCategory = new ServiceCategory();
  @Input() largerTiles = false;
  @Input() showViewAll = false;
  @Output() viewAll = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onViewAll() {
    this.viewAll.emit();
  }
}

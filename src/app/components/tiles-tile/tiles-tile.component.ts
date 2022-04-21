import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Service } from 'src/app/services/services.service';

@Component({
  selector: 'ss-tiles-tile',
  templateUrl: './tiles-tile.component.html',
  styleUrls: ['./tiles-tile.component.less'],
  host: { class: 'tile' },
})
export class TilesTileComponent implements OnInit {
  @Input() data: Service = new Service();
  @Input() larger = false;
  @Output() toggleFavorite = new EventEmitter<boolean>();
  @Output() openInfo = new EventEmitter<void>();

  @HostListener('click', ['this.service.name']) click(event: string) {
    if (this.data.subscribed) {
      console.log(event);
    }
  }
  constructor() {}

  ngOnInit(): void {}

  onFavorite(event: Event) {
    event.stopPropagation();
    this.data.favorite = !this.data.favorite;
    this.toggleFavorite.emit(this.data.favorite);
  }

  onInfo(event: Event) {
    event.stopPropagation();
    this.openInfo.emit();
  }
}

import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Service, Tag } from 'src/app/services/services.service';

@Component({
  selector: 'ss-tiles-tile',
  templateUrl: './tiles-tile.component.html',
  styleUrls: ['./tiles-tile.component.less'],
  host: { class: 'tile' },
})
export class TilesTileComponent implements OnInit {
  @Input() data: Service = new Service();
  @Input() larger = false;
  @Output() toggleFavorite = new EventEmitter<Tag[]>();
  @Output() openInfo = new EventEmitter<void>();

  @HostListener('click', ['this.service.name']) click(event: string) {
    if (this.data.subscribed) {
      console.log(event);
    }
  }

  favorite = false;

  constructor() {}

  ngOnInit(): void {
    this.favorite = this.data.metaTags.find(tag => tag.name === 'Favorites') === undefined ? false : true;
  }

  onFavorite(event: Event) {
    event.stopPropagation();

    if (!this.favorite) {
      this.favorite = true;
    } else {
      this.favorite = false;
    }
    this.toggleFavorite.emit(this.data.metaTags);
  }

  onInfo(event: Event) {
    event.stopPropagation();
    this.openInfo.emit();
  }
}

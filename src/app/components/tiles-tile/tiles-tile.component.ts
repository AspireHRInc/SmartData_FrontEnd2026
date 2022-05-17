import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Service, Tag } from 'src/app/services/services.service';

@Component({
  selector: 'ss-tiles-tile',
  templateUrl: './tiles-tile.component.html',
  styleUrls: ['./tiles-tile.component.less'],
  host: { class: 'tile', '(click)': 'onClickService($event)' },
})
export class TilesTileComponent implements OnInit {
  @Input() data: Service = new Service();
  @Input() larger = false;
  @Output() toggleFavorite = new EventEmitter<Tag[]>();
  @Output() openInfo = new EventEmitter<void>();
  @Input() tabIndex = 0;

  favorite = false;

  constructor(private router: Router) {}

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
  onClickService(event: Event) {
    if (this.data.subscribed) {
      // console.log(event);
      // console.log(this.data);
      this.router.navigate(['/services', this.data.id, 'detail', 'setup']);
    }
  }
}

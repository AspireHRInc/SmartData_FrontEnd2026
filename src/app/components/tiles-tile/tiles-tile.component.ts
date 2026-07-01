import { Component, OnInit, Input, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Service, Tag } from 'src/app/services/services.service';

@Component({
  selector: 'ss-tiles-tile',
  templateUrl: './tiles-tile.component.html',
  styleUrls: ['./tiles-tile.component.less'],
  host: { class: 'tile', '(click)': 'onClickService($event)', '(keyup)': 'onClickService($event)' },
})
export class TilesTileComponent implements OnInit {
  @Input() data: Service = new Service();
  @Input() larger = false;
  @Output() toggleFavorite = new EventEmitter<Tag[]>();
  @Output() openInfo = new EventEmitter<void>();
  @Input() tabIndex = 0;

  @HostBinding('attr.role') ariaRole = 'button';

  favorite = false;
  imagePath = '';

  private readonly tileImageMap: Record<string, string> = {
    /*
    'Template Script': 'assets/images/tiles/template_script.jpg',
    'EC Diamond Data Capture': 'assets/images/tiles/default.png',
    'HeartBeat': 'assets/images/tiles/heartbeat.jpg',
    'Test PT': 'assets/images/tiles/test_pt.jpg',
    'Test SmartData Cloud Connector': 'assets/images/tiles/cloud_connector.jpg',
    'Clone of Test PT': 'assets/images/tiles/clone_testpt.jpg',
    'I9 Research': 'assets/images/tiles/i9_research.jpg',
    'HeartBeat Clone': 'assets/images/tiles/default.png',
    'PBP Report': 'assets/images/tiles/pbpreport.jpg',
    'Production Conversion': 'assets/images/tiles/prod_conversion.jpg',
    'UAT Conversion': 'assets/images/tiles/uat_conversion.jpg',
    'LMS History Conversion': 'assets/images/tiles/lms_history.jpg',
    'Summit Report': 'assets/images/tiles/summit_report.jpg',
    */
  };

  private readonly defaultImage = 'assets/images/tiles/test_pt.jpg';

  constructor(private router: Router) {}

  ngOnInit(): void {
  this.favorite = this.data.metaTags.find(tag => tag.name === 'Favorites') !== undefined;
  this.imagePath = this.getTileImage();
}

getTileImage(): string {
  if (this.data.imageJpgBase64) {
    return `data:image/jpeg;base64,${this.data.imageJpgBase64}`;
  }
  return this.tileImageMap[this.data.name] || this.defaultImage;
}

  getDefaultImage(serviceName: string): string {
    return this.tileImageMap[serviceName] || this.defaultImage;
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
      if (
        event.type === 'click' ||
        (event.type === 'keyup' &&
          ((event as KeyboardEvent).code === 'Space' || (event as KeyboardEvent).code === 'Enter'))
      ) {
        const slug = this.data.name.toLowerCase().replace(/\s+/g, '-');
        this.router.navigate(['/services', slug, 'detail', 'setup']);
      }
    }
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}

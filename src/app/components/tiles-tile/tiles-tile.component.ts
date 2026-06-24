import { Component, OnInit, Input, HostListener, Output, EventEmitter, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Service, Tag } from 'src/app/services/services.service';
import { SERVICE_ICONS } from './service-icons';

// Map a service name to a standardized icon id (first keyword match wins).
// Keeps the tile icons consistent across the (user-defined) service catalog.
const ICON_KEYWORDS: ReadonlyArray<[string, string]> = [
  ['heartbeat', 'monitoring'], ['monitor', 'monitoring'], ['health', 'monitoring'],
  ['script', 'script'],
  ['excel', 'excel'],
  ['successfactor', 'successfactors-odata'], ['odata', 'successfactors-odata'],
  ['sap', 'sap'],
  ['sharepoint', 'sharepoint'],
  ['sftp', 'sftp-directory'], ['ftp', 'sftp-directory'],
  ['odbc', 'odbc'],
  ['xml', 'xml'],
  ['cloud', 'save-cloud'], ['connector', 'save-cloud'],
  ['api', 'generic-api'],
  ['import', 'import'],
  ['backup', 'backup-locally'],
  ['translat', 'translation'],
  ['setting', 'settings'], ['config', 'settings'],
  ['param', 'parameters'],
  ['transform', 'file-transform'],
  ['clone', 'objects'], ['copy', 'objects'], ['duplicate', 'objects'],
  ['message', 'message'], ['notif', 'message'],
  ['group', 'group'], ['user', 'group'], ['employee', 'group'], ['team', 'group'],
  ['capture', 'data-analysis'], ['diamond', 'data-analysis'], ['analy', 'data-analysis'],
  ['report', 'data-analysis'], ['research', 'data-analysis'], ['data', 'data-analysis'],
  ['test', 'tools'], ['tool', 'tools'],
  ['view', 'view'], ['i9', 'view'],
  ['text', 'text'], ['local', 'localdata'],
];

const DEFAULT_ICON = 'data-analysis';

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
  iconSvg: SafeHtml = '';

  constructor(private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.favorite = this.data.metaTags.find(tag => tag.name === 'Favorites') === undefined ? false : true;
    const iconId = this.getIconName(this.data.name);
    this.iconSvg = this.sanitizer.bypassSecurityTrustHtml(SERVICE_ICONS[iconId] || SERVICE_ICONS[DEFAULT_ICON]);
  }

  getIconName(serviceName: string): string {
    const name = (serviceName || '').toLowerCase();
    for (const [keyword, icon] of ICON_KEYWORDS) {
      if (name.includes(keyword)) {
        return icon;
      }
    }
    return DEFAULT_ICON;
  }

  onFavorite(event: Event) {
    event.stopPropagation();
    this.favorite = !this.favorite;
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
}

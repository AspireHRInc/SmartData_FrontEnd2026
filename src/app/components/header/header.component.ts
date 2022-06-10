import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

import { User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';

// export enum HeaderType {
//   'dashboard' = 'dashboard',
//   'serviceDetail' = 'serviceDetail',
// }

@Component({
  selector: 'ss-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  animations: [
    trigger('menuInOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle = '';
  @Input() headerSubtitle = '';
  @Input() headerUserId = 1;
  @Input() headerUserObject = new User();
  @Input() type = 'dashboard';
  menuOpenState = false;

  constructor(private location: Location, public uiState: UiStateService) {}

  ngOnInit(): void {}

  back(event: Event): void {
    if (
      event.type === 'keyup' &&
      ((event as KeyboardEvent).code === 'Space' || (event as KeyboardEvent).code === 'Enter')
    ) {
      this.location.back();
    }
    if (event.type === 'click') {
      this.location.back();
    }
  }

  toggleMenu(event: Event) {
    this.menuOpenState = !this.menuOpenState;
    this.uiState.toggleMenu(this.menuOpenState);
  }

  keyToggleMenu(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      this.menuOpenState = !this.menuOpenState;
      this.uiState.toggleMenu(this.menuOpenState);
    }
  }
}

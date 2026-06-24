import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { User } from 'src/app/services/user.service';
import { UiStateService } from 'src/app/services/ui-state.service';
import { AuthService } from 'src/app/services/auth.service';

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
  @Input() light = false;
  menuOpenState = false;

  logoAnimationDelay: string = '0ms';

  constructor(
    private location: Location,
    public uiState: UiStateService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const cycleDuration = 90000;
    const offset = Date.now() % cycleDuration;
    this.logoAnimationDelay = `-${offset}ms`;
  }

  back(event: Event): void {
    if (
      event.type === 'keyup' &&
      ((event as KeyboardEvent).code === 'Space' || (event as KeyboardEvent).code === 'Enter')
    ) {
      this.router.navigate(['/services/dashboard']);
    }
    if (event.type === 'click') {
      this.router.navigate(['/services/dashboard']);
    }
  }

  toggleMenu(event: Event) {
    this.menuOpenState = !this.menuOpenState;
    this.uiState.toggleMenu(this.menuOpenState);
  }

  goHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['/services/dashboard']);
  }

  keyGoHome(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.router.navigate(['/services/dashboard']);
    }
  }

  keyToggleMenu(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Enter') {
      this.menuOpenState = !this.menuOpenState;
      this.uiState.toggleMenu(this.menuOpenState);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
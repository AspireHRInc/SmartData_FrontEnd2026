import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'ss-session-expired',
  template: `
    <div class="overlay" *ngIf="authService.sessionExpired$ | async">
      <div class="modal">
        <div class="icon">&#9888;</div>
        <h2 class="title">Session Expired</h2>
        <p class="message">Your session has expired. Please sign in again to continue.</p>
        <button class="primary" (click)="signInAgain()">Sign In</button>
      </div>
    </div>
  `,
  styles: [`
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }

    .modal {
      background: var(--color-background-primary);
      border-radius: 12px;
      padding: 2.5rem;
      text-align: center;
      box-shadow: var(--drop-shadow);
      max-width: 24rem;
      width: 90%;
    }

    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.75rem;
    }

    .title {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
    }

    .message {
      color: var(--color-text-secondary);
      margin: 0 0 1.5rem;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .primary {
      padding: 0.6rem 2rem;
      border-radius: 4px;
      border: none;
      background: var(--color-cta);
      color: white;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .primary:hover {
      opacity: 0.9;
    }
  `]
})
export class SessionExpiredComponent {
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  signInAgain(): void {
    this.authService.dismissSessionExpired();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

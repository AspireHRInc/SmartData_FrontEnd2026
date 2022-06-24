import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { AuthService } from 'src/app/services/auth.service';
import { UserService, User } from 'src/app/services/user.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'ss-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  messages = '';

  users: string[] = [];
  usersObjects: User[] = [];

  step = 0;
  isEmailFieldVisible = true;

  signInFormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required],
  });

  get email() {
    return this.signInFormGroup.get('email');
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    public loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.users = this.loginService.loginUserBadgeIds;
    this.usersObjects = this.userService.getUsersByIds(this.users);
  }

  onKeyUp(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      this.signin();
    } else {
      this.clearMessages();
    }
  }

  next() {
    setTimeout(() => {
      if (this.step === 1) {
        this.step = 0;
      } else {
        this.step++;
      }
    }, 300);
  }

  signin() {
    if (this.auth.authenticate(this.signInFormGroup.value.email, this.signInFormGroup.value.password)) {
      this.router.navigateByUrl('/services/dashboard');
    } else {
      this.messages = `Invalid username or password.`;
      this.step = 0;
    }
  }

  clearMessages() {
    this.messages = '';
  }

  emailNextOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.signInFormGroup.controls['email'].status === 'VALID') {
      this.next();
    }
  }

  passwordSinginOnEnter(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.signInFormGroup.controls['password'].status === 'VALID') {
      this.signin();
    }
  }

  clearMassages() {
    this.messages = '';
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/services/user.service';

@Component({
  selector: 'ss-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  @Input() headerTitle = '';
  @Input() headerSubtitle = '';
  @Input() headerUserId = 1;
  @Input() headerUserObject = new User();

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ss-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.less'],
})
export class BadgeComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit(): void {}
}

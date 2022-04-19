import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ss-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.less'],
})
export class BadgeListComponent implements OnInit {
  @Input() badges: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ss-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.less'],
})
export class NavigationButtonComponent implements OnInit {
  @Input() label = '';

  constructor() {}

  ngOnInit(): void {}
  onButtonClick() {}
}

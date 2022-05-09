import { Component, Input, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'ss-status-dot',
  templateUrl: './status-dot.component.html',
  styleUrls: ['./status-dot.component.less'],
})
export class StatusDotComponent implements OnInit {
  @HostBinding('style.background') @Input() color = 'var(--color-cta)';

  constructor() {}

  ngOnInit(): void {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ss-icon-file-w-status-dot',
  templateUrl: './icon-file-w-status-dot.component.html',
  styleUrls: ['./icon-file-w-status-dot.component.less'],
})
export class IconFileWStatusDotComponent implements OnInit {
  @Input() dotColor = 'var(--color-text-secondary)';

  constructor() {}

  ngOnInit(): void {}
}

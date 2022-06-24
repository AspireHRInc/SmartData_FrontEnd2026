import { Component, Input, OnInit } from '@angular/core';
import { ColorService, AccentColor } from 'src/app/services/color.service';

@Component({
  selector: 'ss-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.less'],
  host: { class: 'status-badge' },
})
export class StatusBadgeComponent implements OnInit {
  @Input() color = AccentColor.none;
  @Input() textColor = '';
  @Input() title = `status`;
  @Input() colorFromString = false;
  @Input() bold = false;
  @Input() rounded = false;
  @Input() button = false;
  @Input() outline = true;

  colorFromStringColor = '';

  ngOnInit(): void {
    if (this.colorFromString) {
      this.colorFromStringColor = ColorService.StringToHslColor(this.title);
    }
  }

  constructor() {}
}

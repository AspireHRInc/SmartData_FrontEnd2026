import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'ss-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less'],
  host: { class: 'card' },
})
export class CardComponent implements OnInit {
  @Input() title = '';
  @Input() step = '';
  // @Input() maxWidth = '600px';

  @HostBinding('style.max-width') @Input() maxWidth: string = '600px';

  constructor() {}

  ngOnInit(): void {}
}

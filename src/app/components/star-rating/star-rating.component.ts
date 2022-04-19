import { Component, Input } from '@angular/core';

export enum StarRatingAlignment {
  left = 'left',
  right = 'right',
  center = 'center',
}

@Component({
  selector: 'rr-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.less'],
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Input() wrapTotal = false;
  @Input() align = StarRatingAlignment.center;
  @Input() showRatingNumber = true;

  constructor() {}
}

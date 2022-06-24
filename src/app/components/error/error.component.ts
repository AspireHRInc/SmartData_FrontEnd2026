import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less'],
})
export class ErrorComponent implements OnInit {
  @Input() message = '';
  @Input() id = -1;
  @Output() close: EventEmitter<number> = new EventEmitter();

  constructor(public uiState: UiStateService) {}

  ngOnInit(): void {
    console.log(this.id);
  }

  onClose() {
    this.close.emit(this.id);
  }
}

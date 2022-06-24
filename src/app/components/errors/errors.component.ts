import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.less'],
})
export class ErrorsComponent implements OnInit {
  messages: { id: number; message: string }[] = [];

  constructor(public uiState: UiStateService) {}
  id = 0;
  ngOnInit(): void {
    this.uiState.errorNotification$.subscribe(errorMessage => {
      if (errorMessage !== '') {
        this.id++;
        this.messages.push({ id: this.id, message: errorMessage });
      }
    });
  }

  onClose(id: number) {
    this.messages = this.messages.filter(message => message.id !== id);
  }
}

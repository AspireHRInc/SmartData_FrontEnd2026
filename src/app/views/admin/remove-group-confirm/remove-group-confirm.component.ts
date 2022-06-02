import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { UiStateService } from 'src/app/services/ui-state.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'ss-remove-group-confirm',
  templateUrl: './remove-group-confirm.component.html',
  styleUrls: ['./remove-group-confirm.component.less'],
})
export class RemoveGroupConfirmComponent implements OnInit {
  @Output() confirmUserGroupDelete = new EventEmitter<string>();
  constructor(private uiState: UiStateService, private userService: UserService) {}

  ngOnInit(): void {}

  public close(): void {
    this.uiState.hideConfirmUserGroupDelete();
  }

  confirm() {
    this.confirmUserGroupDelete.emit();
    this.uiState.hideConfirmUserGroupDelete();
  }
}

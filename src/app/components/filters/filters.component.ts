import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FilterCategory, Filter } from '../../services/services.service';
import { UiStateService } from '../../services/ui-state.service';

@Component({
  selector: 'ss-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less'],
})
export class FiltersComponent implements OnInit {
  @Input() opened = false;
  @Input() data: FilterCategory[] = [];

  formGroup: FormGroup = this.fb.group({
    billToDept: [''],
    billToDept1: ['', Validators.required],
    billToDept2: ['', Validators.required],
    billToDept3: ['', Validators.required],
  });

  windowTop = 300;
  windowWidth: number = 500;
  windowLeft: number =
    Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - this.windowWidth - 40;
  windowOptions = ['option1', 'option2'];

  subscribedVisible = false;

  constructor(private fb: FormBuilder, public uiState: UiStateService) {}

  ngOnInit(): void {}

  close() {
    // this.opened = false;
    console.log(this.uiState.serviceFiltersOpen$);
    this.uiState.hideServiceFilters();
  }

  submit() {}

  reset() {}
}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { field } from 'src/app/services/service-setup.service';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'ss-field-date',
  templateUrl: './field-date.component.html',
  styleUrls: ['./field-date.component.less'],
})
export class FieldDateComponent implements OnInit {
  @Input() parameters!: field;
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() tabindex = 0;
  value: any;

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  constructor(public localizationService: LocalizationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup.addControl(this.parameters.ParameterName, this.fb.control(''));
    if (this.parameters.Required) {
      this.formGroup.get(this.parameters.ParameterName)!.addValidators(Validators.required);
    } else {
      this.formGroup.get(this.parameters.ParameterName)!.clearValidators();
    }
  }

  toggleToolTip(eventTarget: Element): void {
    this.tooltipDir.toggle(eventTarget);
  }
  showToolTip(eventTarget: Element): void {
    this.tooltipDir.show(eventTarget);
  }

  hideToolTip(eventTarget: Element): void {
    this.tooltipDir.hide();
  }
}

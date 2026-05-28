
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field } from 'src/app/services/service-setup.service';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'ss-field-date',
  templateUrl: './field-date.component.html',
  styleUrls: ['./field-date.component.less'],
})
export class FieldDateComponent implements OnInit {
  @Input() parameters!: Field;
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() tabindex = 0;
  @Input() static = false;
  value: any;

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  constructor(public localizationService: LocalizationService, private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.static) {
      this.formGroup.addControl(
        this.parameters.ParameterName,
        this.fb.control(this.parameters.value || this.parameters.DefaultValue || '')
      );
      if (this.parameters.Required) {
        this.formGroup.get(this.parameters.ParameterName)!.addValidators(Validators.required);
      } else {
        this.formGroup.get(this.parameters.ParameterName)!.clearValidators();
      }

      // Sync form control value back to parameters.value
      this.formGroup.get(this.parameters.ParameterName)!.valueChanges.subscribe(val => {
        this.parameters.value = val;
      });
    }
  }

  toggleToolTip(eventTarget: Element): void {
    if (this.parameters.hasOwnProperty('ShowHelpOnFocus') && this.parameters.ShowHelpOnFocus) {
      this.tooltipDir.show(eventTarget);
    }
  }
  showToolTip(eventTarget: Element): void {
    if (this.parameters.hasOwnProperty('ShowHelpOnFocus') && this.parameters.ShowHelpOnFocus) {
      this.tooltipDir.hide();
    }
  }

  hideToolTip(eventTarget: Element): void {
    this.tooltipDir.hide();
  }
}


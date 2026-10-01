import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Field, fieldOptions } from 'src/app/services/service-setup.service';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { initialFieldValue, toCheckboxValue } from '../field-initial-value';

@Component({
  selector: 'ss-field-checkbox',
  templateUrl: './field-checkbox.component.html',
  styleUrls: ['./field-checkbox.component.less'],
})
export class FieldCheckboxComponent implements OnInit {
  @Input() parameters!: Field;
  @Input() tabindex = 0;
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() static = false;

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  selectedItem: fieldOptions = { Pvalue: '', Plabel: '' };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.static) {
      const checked = toCheckboxValue(initialFieldValue(this.parameters));
      this.parameters.value = checked;
      this.formGroup.addControl(this.parameters.ParameterName, this.fb.control(checked));
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
    this.tooltipDir.toggle(eventTarget);
  }
  showToolTip(eventTarget: Element): void {
    if (this.parameters.hasOwnProperty('ShowHelpOnFocus') && this.parameters.ShowHelpOnFocus) {
      this.tooltipDir.show(eventTarget);
    }
  }

  hideToolTip(eventTarget: Element): void {
    if (this.parameters.hasOwnProperty('ShowHelpOnFocus') && this.parameters.ShowHelpOnFocus) {
      this.tooltipDir.hide();
    }
  }
}

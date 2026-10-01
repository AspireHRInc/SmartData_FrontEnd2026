import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field, fieldOptions } from 'src/app/services/service-setup.service';
import { initialFieldOption } from '../field-initial-value';

@Component({
  selector: 'ss-field-select',
  templateUrl: './field-select.component.html',
  styleUrls: ['./field-select.component.less'],
})
export class FieldSelectComponent implements OnInit, AfterViewInit {
  @Input() parameters!: Field;
  @Input() tabindex = 0;
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() static = false;

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  currentValue: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.static) {
      this.formGroup.addControl(this.parameters.ParameterName, this.fb.control(''));

      if (this.parameters.Required) {
        this.formGroup.get(this.parameters.ParameterName)!.addValidators(Validators.required);
      } else {
        this.formGroup.get(this.parameters.ParameterName)!.clearValidators();
      }

      // start from the saved selection, or the default when nothing was chosen yet
      const selected = initialFieldOption(this.parameters);
      this.formGroup.get(this.parameters.ParameterName)!.setValue(selected);
      this.currentValue = selected;
      this.parameters.value = selected.Pvalue;

      // Sync form control value back to parameters.value
      this.formGroup.get(this.parameters.ParameterName)!.valueChanges.subscribe(result => {
        this.currentValue = result;
        // Store the Pvalue as the canonical value
        this.parameters.value = result?.Pvalue || '';

        if (this.parameters.Required) {
          if (result.Pvalue === null || result.value === null || result === undefined) {
            this.formGroup.get(this.parameters.ParameterName)!.setErrors({ incorrect: true });
            this.formGroup.get(this.parameters.ParameterName)!.markAsTouched();
          } else {
            this.formGroup.get(this.parameters.ParameterName)!.setErrors(null);
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    if (!this.static) {
      this.formGroup.get(this.parameters.ParameterName)!.setErrors({ incorrect: true });
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
    this.setError();
  }

  setError(): void {
    if (this.parameters.Required) {
      if (
        this.currentValue.Pvalue === null ||
        this.currentValue.value === null ||
        this.currentValue.Pvalue === '' ||
        this.currentValue === undefined
      ) {
        this.formGroup.get(this.parameters.ParameterName)!.setErrors({ incorrect: true });
        this.formGroup.get(this.parameters.ParameterName)!.markAsTouched();
      } else {
        this.formGroup.get(this.parameters.ParameterName)!.setErrors(null);
      }
    }
  }

  testInvalid() {
    this.formGroup.get(this.parameters.ParameterName)!.setErrors({ incorrect: true });
  }
}

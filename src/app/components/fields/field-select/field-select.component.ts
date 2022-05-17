import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field, fieldOptions } from 'src/app/services/service-setup.service';

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

      // set default value
      if (this.parameters.DefaultValue !== undefined) {
        this.formGroup
          .get(this.parameters.ParameterName)!
          .setValue({ Pvalue: this.parameters.DefaultValue, Plabel: this.parameters.DefaultValue });
        this.currentValue = { Pvalue: this.parameters.DefaultValue, Plabel: this.parameters.DefaultValue };
      } else {
        this.formGroup.get(this.parameters.ParameterName)!.setValue({ Pvalue: '', Plabel: '' });
        this.currentValue = { Pvalue: '', Plabel: '' };
      }

      if (this.parameters.Required) {
        this.formGroup.get(this.parameters.ParameterName)!.valueChanges.subscribe(result => {
          this.currentValue = result;
          if (result.Pvalue === null || result.value === null || result === undefined) {
            this.formGroup.get(this.parameters.ParameterName)!.setErrors({ incorrect: true });
            this.formGroup.get(this.parameters.ParameterName)!.markAsTouched();
          } else {
            this.formGroup.get(this.parameters.ParameterName)!.setErrors(null);
          }
        });
      }
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
    this.tooltipDir.show(eventTarget);
  }

  hideToolTip(eventTarget: Element): void {
    this.tooltipDir.hide();
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

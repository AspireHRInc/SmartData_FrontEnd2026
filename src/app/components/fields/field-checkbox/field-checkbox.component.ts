import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { field, fieldOptions } from 'src/app/services/service-setup.service';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'ss-field-checkbox',
  templateUrl: './field-checkbox.component.html',
  styleUrls: ['./field-checkbox.component.less'],
})
export class FieldCheckboxComponent implements OnInit {
  @Input() parameters!: field;
  @Input() tabindex = 0;
  @Input() formGroup: FormGroup = this.fb.group({});

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  selectedItem: fieldOptions = { Pvalue: '', Plabel: '' };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.parameters.DefaultValue !== undefined) {
      this.selectedItem = { Pvalue: this.parameters.DefaultValue, Plabel: this.parameters.DefaultValue };
    }
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

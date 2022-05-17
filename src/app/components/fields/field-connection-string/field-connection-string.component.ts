import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field, fieldOptions } from 'src/app/services/service-setup.service';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'ss-field-connection-string',
  templateUrl: './field-connection-string.component.html',
  styleUrls: ['./field-connection-string.component.less'],
})
export class FieldConnectionStringComponent implements OnInit {
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

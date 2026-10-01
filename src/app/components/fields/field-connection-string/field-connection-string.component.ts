
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field, fieldOptions } from 'src/app/services/service-setup.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { initialFieldOption } from '../field-initial-value';

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
      // start from the saved selection, or the default when nothing was chosen yet
      this.selectedItem = initialFieldOption(this.parameters);
      this.parameters.value = this.selectedItem.Pvalue;
      this.formGroup.addControl(this.parameters.ParameterName, this.fb.control(this.selectedItem));
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


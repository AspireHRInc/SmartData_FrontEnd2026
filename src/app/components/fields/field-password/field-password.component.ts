import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field } from 'src/app/services/service-setup.service';

@Component({
  selector: 'ss-field-password',
  templateUrl: './field-password.component.html',
  styleUrls: ['./field-password.component.less'],
})
export class FieldPasswordComponent implements OnInit {
  @Input() parameters!: Field;
  @Input() formGroup: FormGroup = this.fb.group({});
  @Input() tabindex = 0;
  @Input() static = false;

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  fieldType = 'password';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.static) {
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

  toggleView() {
    if (this.fieldType === 'password') {
      this.fieldType = 'text';
    } else {
      this.fieldType = 'password';
    }
  }
}

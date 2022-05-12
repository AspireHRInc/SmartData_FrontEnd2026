import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { field } from 'src/app/services/service-setup.service';

@Component({
  selector: 'ss-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['./field-text.component.less'],
})
export class FieldTextComponent implements OnInit {
  @Input() parameters: field = new field();
  @Input() tabindex: number = 0;
  @Input() formGroup: FormGroup = this.fb.group({});

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

  constructor(private fb: FormBuilder) {}

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

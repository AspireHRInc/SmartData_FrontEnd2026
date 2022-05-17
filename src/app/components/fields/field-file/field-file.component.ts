import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

import { Field } from 'src/app/services/service-setup.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { FieldGroupComponent } from '../../field-group/field-group.component';

@Component({
  selector: 'ss-field-file',
  templateUrl: './field-file.component.html',
  styleUrls: ['./field-file.component.less'],
})
export class FieldFileComponent implements OnInit {
  @Input() parameters!: Field;
  @Input() tabindex = 0;
  @Input() formGroup: FormGroup = this.fb.group({});
  @Output() fileAbort = new EventEmitter<string>();
  @Input() static = false;

  @ViewChild(TooltipDirective)
  tooltipDir!: TooltipDirective;

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

  onFileAbort(event: any) {
    this.fileAbort.emit(event.files[0].name);
  }

  uploadEventHandler(event: any) {
    let fileNames = event.files.map((files: any) => files.name);
    console.log(fileNames);
  }
}

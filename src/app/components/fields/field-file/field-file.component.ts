
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
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {}

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
  onFileSelect(event: any) {
  if (event.files && event.files.length > 0) {
    this.selectedFile = event.files[0].rawFile;
    this.parameters.rawFile = event.files[0].rawFile;
    this.formGroup.get(this.parameters.ParameterName)?.setValue(event.files[0].name);
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

  // Also update onFileAbort to clear the stored file:
  onFileAbort(event: any) {
  this.selectedFile = null;
  this.parameters.rawFile = null;
  this.formGroup.get(this.parameters.ParameterName)?.setValue('');
  if (event?.files && event.files.length > 0) {
    this.fileAbort.emit(event.files[0].name);
  }
}

  uploadEventHandler(event: any) {
    // Prevent Kendo from auto-uploading
    event.preventDefault();
    
    // Store the raw file object
    if (event.files && event.files.length > 0) {
      this.selectedFile = event.files[0].rawFile;
      this.parameters.rawFile = event.files[0].rawFile;
      // Update the form control value with the filename (so validation passes)
      this.formGroup.get(this.parameters.ParameterName)?.setValue(event.files[0].name);
    }
  }
}


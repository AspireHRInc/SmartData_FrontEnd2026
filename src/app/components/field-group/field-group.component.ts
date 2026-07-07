import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Field } from 'src/app/services/service-setup.service';
import { UiStateService } from 'src/app/services/ui-state.service';

@Component({
  selector: 'ss-field-group',
  templateUrl: './field-group.component.html',
  styleUrls: ['./field-group.component.less'],
  host: { class: 'field-group' },
})
export class FieldGroupComponent implements OnInit {
  @Input() fields: Field[] = [];
  @Input() formGroup: FormGroup = this.fb.group({});
  @Output() submit = new EventEmitter<FormGroup>();
  @Output() abortFile = new EventEmitter<string>();
  @Input() static = false;
  @Input() staticData: Field[] = [];
  @Input() buttonText = 'Submit';
  @Output() formTouchedAndInvalid = new EventEmitter<boolean>();
  @Input() step = '';
  @Input() title = 'Setup Parameters';

  fieldsWithValues: any;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    //private readonly changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private uiState: UiStateService
  ) {}

  ngOnInit(): void {
    this.formGroup.statusChanges.subscribe(newStatus => {
      if (this.formGroup.dirty) {
        this.formTouchedAndInvalid.emit(true);
        this.uiState.setUnsavedFormPreventNavigate(true);
      }
    });
  }

  /*ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }*/

  save(valid: boolean): void {
    if (valid) {
      this.submitted = true;
      this.uiState.setUnsavedFormPreventNavigate(false);
      this.submit.emit(this.formGroup);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onFileAbort(fileName: string) {
    this.abortFile.emit(fileName);
  }

  trackByFieldName(index: number, field: Field): string {
    return field.ParameterName;
  }
}


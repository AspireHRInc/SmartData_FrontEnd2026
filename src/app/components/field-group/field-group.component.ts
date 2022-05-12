import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { field } from 'src/app/services/service-setup.service';

@Component({
  selector: 'ss-field-group',
  templateUrl: './field-group.component.html',
  styleUrls: ['./field-group.component.less'],
  host: { class: 'field-group' },
})
export class FieldGroupComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() fields: field[] = [];
  @Input() formGroup: FormGroup = this.fb.group({});
  @Output() submit = new EventEmitter<FormGroup>();

  submitted = false;

  ngOnInit(): void {}

  save(valid: boolean): void {
    this.submitted = true;
    if (valid) {
      console.log('Everything is OK!');
      this.submit.emit(this.formGroup);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { field } from 'src/app/services/service-setup.service';

@Component({
  selector: 'ss-field-checkbox',
  templateUrl: './field-checkbox.component.html',
  styleUrls: ['./field-checkbox.component.less'],
})
export class FieldCheckboxComponent implements OnInit {
  @Input() parameters!: field;
  @Input() formGroup: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup.addControl(this.parameters.ParameterName, this.fb.control(''));
    if (this.parameters.Required) {
      this.formGroup.get(this.parameters.ParameterName)!.addValidators(Validators.required);
    } else {
      this.formGroup.get(this.parameters.ParameterName)!.clearValidators();
    }
  }
}

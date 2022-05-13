import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { field } from 'src/app/services/service-setup.service';

import { FieldTextComponent } from '../components/fields/field-text/field-text.component';
import { FieldFileComponent } from '../components/fields/field-file/field-file.component';
import { FieldSelectComponent } from '../components/fields/field-select/field-select.component';
import { FieldCheckboxComponent } from '../components/fields/field-checkbox/field-checkbox.component';
import { FieldConnectionStringComponent } from '../components/fields/field-connection-string/field-connection-string.component';
import { FieldPasswordComponent } from '../components/fields/field-password/field-password.component';
import { FieldOutputFileComponent } from '../components/fields/field-output-file/field-output-file.component';
import { FieldDateComponent } from '../components/fields/field-date/field-date.component';

const fieldMap: Record<string, any> = {
  text: FieldTextComponent,
  file: FieldFileComponent,
  selection: FieldSelectComponent,
  checkbox: FieldCheckboxComponent,
  connectionstring: FieldConnectionStringComponent,
  password: FieldPasswordComponent,
  outputfile: FieldOutputFileComponent,
  date: FieldDateComponent,
};

@Directive({
  selector: '[ssFieldGenerator]',
})
export class FieldGeneratorDirective implements OnInit {
  @Input()
  fieldName!: string;

  @Input()
  field!: field;

  @Input()
  formGroup!: FormGroup;

  @Input() tabindex: number = 0;

  @Output() removeFile = new EventEmitter<string>();

  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    // const _fieldName = this.fieldName.toLowerCase();
    const _fieldName = this.field.ParameterType.toLowerCase();

    if (fieldMap.hasOwnProperty(_fieldName)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldMap[_fieldName]);
      let fieldRef: any = this.viewContainerRef.createComponent(componentFactory).instance;

      fieldRef.parameters = this.field;
      fieldRef.formGroup = this.formGroup;
      fieldRef.tabindex = (this.tabindex + 1) * 2;

      if (fieldRef.removeFile !== undefined) {
        fieldRef.removeFile.subscribe((fileName: string) => {
          this.removeFile.emit(fileName);
        });
      }
    }
  }
}

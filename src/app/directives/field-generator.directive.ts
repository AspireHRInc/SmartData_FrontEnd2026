
import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Field } from 'src/app/services/service-setup.service';

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
export class FieldGeneratorDirective implements OnInit, OnChanges {
  @Input() fieldName!: string;
  @Input() field!: Field;
  @Input() formGroup!: FormGroup;
  @Input() tabindex: number = 0;
  @Input() static = false;
  @Input() staticField!: Field;
  @Output() fileAbort = new EventEmitter<string>();

  constructor(public viewContainerRef: ViewContainerRef, private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    this.renderField();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Re-render when field or staticField changes (handles tile switching)
    if (changes['field'] || changes['staticField']) {
      this.renderField();
    }
  }

  private renderField(): void {
    // Clear any previously rendered component
    this.viewContainerRef.clear();

    const _fieldName = !this.static
      ? this.field?.ParameterType?.toLowerCase()
      : this.staticField?.ParameterType?.toLowerCase();

    if (!_fieldName) {
      console.warn('FieldGenerator: No ParameterType found, skipping render');
      return;
    }

    if (fieldMap.hasOwnProperty(_fieldName)) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(fieldMap[_fieldName]);
      let fieldRef: any = this.viewContainerRef.createComponent(componentFactory).instance;

      if (!this.static) {
        fieldRef.parameters = this.field;
        fieldRef.formGroup = this.formGroup;
        fieldRef.tabindex = (this.tabindex + 1) * 2;
        if (fieldRef.fileAbort !== undefined) {
          fieldRef.fileAbort.subscribe((fileName: string) => {
            this.fileAbort.emit(fileName);
          });
        }
      } else {
        fieldRef.static = this.static;
        fieldRef.parameters = this.staticField;
      }
    } else {
      console.warn(`FieldGenerator: Unknown field type "${_fieldName}", falling back to text`);
      // Fallback to text component for unknown types
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FieldTextComponent);
      let fieldRef: any = this.viewContainerRef.createComponent(componentFactory).instance;

      if (!this.static) {
        fieldRef.parameters = this.field;
        fieldRef.formGroup = this.formGroup;
        fieldRef.tabindex = (this.tabindex + 1) * 2;
      } else {
        fieldRef.static = this.static;
        fieldRef.parameters = this.staticField;
      }
    }
  }
}


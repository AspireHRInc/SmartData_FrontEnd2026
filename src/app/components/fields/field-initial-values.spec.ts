import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { TooltipModule } from '@progress/kendo-angular-tooltip';

import { Field, fieldOptions } from 'src/app/services/service-setup.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { FieldCheckboxComponent } from './field-checkbox/field-checkbox.component';
import { FieldConnectionStringComponent } from './field-connection-string/field-connection-string.component';
import { FieldDateComponent } from './field-date/field-date.component';
import { FieldFileComponent } from './field-file/field-file.component';
import { FieldPasswordComponent } from './field-password/field-password.component';
import { FieldSelectComponent } from './field-select/field-select.component';
import { FieldTextComponent } from './field-text/field-text.component';

// Builds a Field the way ServiceSetupService.loadServiceSetup does: DefaultValue is always a
// string, and value starts out as the default (or the matched option's Pvalue for selections).
function makeField(props: Partial<Field>): Field {
  return Object.assign(new Field(), { ParameterName: 'param', Caption: 'Param' }, props);
}

function option(Pvalue: string, Plabel: string): fieldOptions {
  return Object.assign(new fieldOptions(), { Pvalue, Plabel });
}

// Field components are recreated every time the setup form renders, including when the user
// returns from the confirm step; SetupComponent copies the saved values back onto the fields first.
function init<T extends { parameters: Field; formGroup: FormGroup; ngOnInit(): void }>(
  component: T,
  field: Field
): any {
  component.parameters = field;
  component.formGroup = new FormBuilder().group({});
  component.ngOnInit();
  return component.formGroup.get(field.ParameterName)!.value;
}

describe('field initial values', () => {
  const fb = new FormBuilder();

  describe('text-like fields', () => {
    const factories: [string, () => any][] = [
      ['text', () => new FieldTextComponent(fb)],
      ['password', () => new FieldPasswordComponent(fb)],
      ['date', () => new FieldDateComponent(new LocalizationService(), fb)],
      ['file', () => new FieldFileComponent(fb)],
    ];

    factories.forEach(([type, create]) => {
      it(`${type}: starts from the default when nothing was entered`, () => {
        expect(init(create(), makeField({ DefaultValue: 'abc', value: 'abc' }))).toBe('abc');
        expect(init(create(), makeField({ DefaultValue: 'abc', value: undefined }))).toBe('abc');
      });

      it(`${type}: keeps a value the user entered`, () => {
        expect(init(create(), makeField({ DefaultValue: 'abc', value: 'xyz' }))).toBe('xyz');
      });

      it(`${type}: keeps a value the user deliberately cleared`, () => {
        expect(init(create(), makeField({ DefaultValue: 'abc', value: '' }))).toBe('');
      });

      it(`${type}: is empty when there is no default and no value`, () => {
        expect(init(create(), makeField({ DefaultValue: '', value: undefined }))).toBe('');
      });
    });
  });

  describe('checkbox', () => {
    const create = () => new FieldCheckboxComponent(fb);

    it('treats a "false" default as unchecked', () => {
      expect(init(create(), makeField({ ParameterType: 'checkbox', DefaultValue: 'false', value: 'false' }))).toBe(
        false
      );
    });

    it('treats a "true" default as checked', () => {
      expect(init(create(), makeField({ ParameterType: 'checkbox', DefaultValue: 'true', value: 'true' }))).toBe(true);
      expect(init(create(), makeField({ ParameterType: 'checkbox', DefaultValue: 'True', value: 'True' }))).toBe(true);
    });

    it('is unchecked when there is no default', () => {
      expect(init(create(), makeField({ ParameterType: 'checkbox', DefaultValue: '', value: '' }))).toBe(false);
    });

    it('keeps the saved choice instead of the default when the form is re-rendered', () => {
      const field = makeField({ ParameterType: 'checkbox', DefaultValue: 'true', value: false });
      expect(init(create(), field)).toBe(false);
      expect(field.value).toBe(false);

      const checked = makeField({ ParameterType: 'checkbox', DefaultValue: 'false', value: true });
      expect(init(create(), checked)).toBe(true);
      expect(checked.value).toBe(true);
    });

    it('writes the form value back to the field', () => {
      const component = create();
      const field = makeField({ ParameterType: 'checkbox', DefaultValue: 'false', value: 'false' });
      init(component, field);
      component.formGroup.get('param')!.setValue(true);
      expect(field.value).toBe(true);
    });
  });

  // Both dropdown components share the same option handling.
  const dropdowns: [string, () => any][] = [
    ['selection', () => new FieldSelectComponent(fb)],
    ['connection string', () => new FieldConnectionStringComponent(fb)],
  ];

  dropdowns.forEach(([type, create]) => {
    describe(type, () => {
      const options = () => [option('A', 'Alpha'), option('B', 'Beta')];

      it('selects the default option', () => {
        const field = makeField({ DefaultValue: 'A', value: 'A', Options: options() });
        expect(init(create(), field)).toEqual(jasmine.objectContaining({ Pvalue: 'A', Plabel: 'Alpha' }));
        expect(field.value).toBe('A');
      });

      it('selects the option a label-valued default was matched to', () => {
        // loadServiceSetup resolves a default given by label to the option's Pvalue.
        const field = makeField({ DefaultValue: 'Beta', value: 'B', Options: options() });
        expect(init(create(), field)).toEqual(jasmine.objectContaining({ Pvalue: 'B', Plabel: 'Beta' }));
        expect(field.value).toBe('B');
      });

      it('keeps the saved selection instead of the default when the form is re-rendered', () => {
        // The setup form stores the dropdown's { Pvalue, Plabel } object as the saved value.
        const field = makeField({ DefaultValue: 'A', value: { Pvalue: 'B', Plabel: 'Beta' }, Options: options() });
        expect(init(create(), field)).toEqual(jasmine.objectContaining({ Pvalue: 'B', Plabel: 'Beta' }));
        expect(field.value).toBe('B');
      });

      it('keeps a default that is not one of the options', () => {
        const field = makeField({ DefaultValue: 'Z', value: 'Z', Options: options() });
        expect(init(create(), field)).toEqual(jasmine.objectContaining({ Pvalue: 'Z', Plabel: 'Z' }));
        expect(field.value).toBe('Z');
      });

      it('is empty when there is no default and no value', () => {
        const field = makeField({ DefaultValue: '', value: '', Options: options() });
        expect(init(create(), field)).toEqual(jasmine.objectContaining({ Pvalue: '', Plabel: '' }));
      });
    });
  });
});

describe('FieldCheckboxComponent rendering', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, InputsModule, LabelModule, TooltipModule],
      declarations: [FieldCheckboxComponent],
    }).compileComponents();
  });

  function render(DefaultValue: string): HTMLInputElement {
    const fixture = TestBed.createComponent(FieldCheckboxComponent);
    fixture.componentInstance.parameters = makeField({ ParameterType: 'checkbox', DefaultValue, value: DefaultValue });
    fixture.componentInstance.formGroup = new FormBuilder().group({});
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('input[type="checkbox"]');
  }

  it('renders a parameter that defaults to false as unchecked', () => {
    expect(render('false').checked).toBe(false);
  });

  it('renders a parameter that defaults to true as checked', () => {
    expect(render('true').checked).toBe(true);
  });
});

import { Field, fieldOptions } from 'src/app/services/service-setup.service';

// Field components are recreated whenever the setup form renders, including when the user comes
// back from the confirm step. SetupComponent copies the saved values onto the fields before that,
// and loadServiceSetup / resetFieldValuesToDefaults already seed value with the default, so value
// is the source of truth: it only falls back to the default when it was never set at all.
// A value the user cleared ('') or unchecked (false) is kept.
export function initialFieldValue(field: Field): any {
  if (field.value !== undefined && field.value !== null) {
    return field.value;
  }
  return field.DefaultValue ?? '';
}

// Checkbox defaults arrive as strings ("true"/"false"), and "false" is truthy, so they have to be
// parsed rather than bound directly.
export function toCheckboxValue(value: any): boolean {
  if (typeof value === 'string') {
    return ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());
  }
  return !!value;
}

// Dropdowns bind { Pvalue, Plabel } objects. The saved value may be that object (what the form
// submits) or a plain Pvalue (what loadServiceSetup sets), and a default may be given by label.
// Returns the matching option so the dropdown and the confirm summary show its label; a value that
// is not one of the options is kept as-is.
export function initialFieldOption(field: Field): fieldOptions {
  const value = initialFieldValue(field);
  const raw = value !== null && typeof value === 'object' ? value.Pvalue : value;

  if (raw === undefined || raw === null || raw === '') {
    return { Pvalue: '', Plabel: '' };
  }

  const key = String(raw);
  const options = field.Options || [];
  const match = options.find(o => o.Pvalue === key) || options.find(o => o.Plabel === key);
  if (match) {
    return match;
  }

  const label = value !== null && typeof value === 'object' && value.Plabel ? value.Plabel : key;
  return { Pvalue: key, Plabel: label };
}

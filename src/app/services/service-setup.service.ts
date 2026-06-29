import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiStateService } from './ui-state.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export class Field {
  ParameterName = '';
  Caption = '';
  Required = false;
  DefaultValue?: string = '';
  TemplateS3Path?: string = '';
  ParameterType = '';
  Options?: fieldOptions[] = [];
  DisplayOrder = 0;
  UploadSaveUrl?: string = '';
  UploadRemoveUrl?: string = '';
  HelpText?: string = '';
  value?: any;
  ShowHelpOnFocus?: boolean;

  constructor() {}
}

export class fieldOptions {
  Pvalue?: string = '';
  Plabel?: string = '';

  constructor() {}
}

export class Fields {
  tags: string[] = [];
  Parameters: Field[] = [];
  DXScriptS3Path = '';
  longDescription = '';

  constructor() {}
}

export class setupOptions {
  Parameters = [];

  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class ServiceSetupService {
  currentServiceFields: Fields = new Fields();
  currentServiceSetup: Field[] = [];
  currentProcessItem: any = null;
  private setupLocked = false;

  // FIX 1: BehaviorSubject to notify UI components when setup changes
  private serviceFieldsSubject = new BehaviorSubject<Fields>(new Fields());
  serviceFields$ = this.serviceFieldsSubject.asObservable();

  private serviceSetupSubject = new BehaviorSubject<Field[]>([]);
  serviceSetup$ = this.serviceSetupSubject.asObservable();

  // FIX 2: Track whether setup has been loaded to prevent stale reads
  private setupLoaded = false;
  get isSetupLoaded(): boolean {
    return this.setupLoaded;
  }

  private apiBase = environment.apiUrl;

  constructor(
    private uiState: UiStateService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.uiState.abandonCurrentForm$.subscribe(() => {
      this.currentFormAbandoned();
    });
  }

  lockSetup(): void {
    this.setupLocked = true;
  }

  unlockSetup(): void {
    this.setupLocked = false;
  }

  private getIdToken(): string {
    /*const keys = Object.keys(localStorage);
    const idTokenKey = keys.find(k => k.includes('idToken'));
    if (idTokenKey) {
      return localStorage.getItem(idTokenKey) || '';
    }
    return '';*/
    return this.authService.getIdToken();
  }

  private getHeaders(): HttpHeaders {
    const idToken = this.getIdToken();

    let partition = '';
    try {
      if (idToken && idToken.split('.').length === 3) {
        const payload = JSON.parse(atob(idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        partition = (payload['custom:Org'] || partition).replace(/#$/, '');
      }
    } catch (e) {
      console.warn('Could not decode token for Partition header');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${idToken}`,
      'Partition': partition
    });
  }

  private mapParameterType(apiType: string): string {
    if (!apiType) return 'text';

    const typeMap: { [key: string]: string } = {
      'Text': 'text',
      'text': 'text',
      'String': 'text',
      'string': 'text',
      'TextArea': 'text',
      'textarea': 'text',
      'MultiLine': 'text',
      'Selection': 'selection',
      'selection': 'selection',
      'Dropdown': 'selection',
      'dropdown': 'selection',
      'Select': 'selection',
      'select': 'selection',
      'ComboBox': 'selection',
      'File': 'file',
      'file': 'file',
      'Upload': 'file',
      'upload': 'file',
      'OutputFile': 'outputfile',
      'outputfile': 'outputfile',
      'OutputFileTemplate': 'outputfile',
      'Checkbox': 'checkbox',
      'checkbox': 'checkbox',
      'Boolean': 'checkbox',
      'boolean': 'checkbox',
      'Toggle': 'checkbox',
      'ConnectionString': 'connectionstring',
      'connectionstring': 'connectionstring',
      'Password': 'password',
      'password': 'password',
      'Date': 'date',
      'date': 'date',
      'DateTime': 'date',
      'datetime': 'date',
      'Number': 'text',
      'number': 'text',
      'Integer': 'text',
    };

    return typeMap[apiType] || 'text';
  }

  
loadServiceSetup(processItem: any): void {
  if (this.setupLocked) {
    console.log('loadServiceSetup skipped — setup is locked');
    return;
  }

  // FIX 3: Guard against null/undefined processItem on refresh
  if (!processItem) {
    console.warn('loadServiceSetup called with null/undefined processItem — skipping');
    return;
  }

  console.log('loadServiceSetup called with:', processItem);

  this.currentProcessItem = processItem;
  
  const inputParams = processItem.inputParameters || processItem.InputParameters || [];
  console.log('Input parameters found:', inputParams);

  if (inputParams.length === 0) {
    console.log('No input parameters defined for this process');
    this.currentServiceFields = new Fields();
    this.currentServiceSetup = [];
    this.setupLoaded = true;
    this.emitUpdate();
    return;
  }

  const fields: Field[] = inputParams.map((param: any, index: number) => {
    const metadata = param.parameterMetadata || {};
    const field = new Field();

    field.ParameterName = param.name || '';
    field.Caption = metadata.caption || param.name || '';
    field.Required = metadata.required === true || metadata.required === 'true';

    // FIX 4: Use null-aware checks instead of falsy coalescing
    field.DefaultValue = param.defaultValue !== undefined && param.defaultValue !== null
      ? String(param.defaultValue)
      : (param.value !== undefined && param.value !== null ? String(param.value) : '');

    field.ParameterType = this.mapParameterType(metadata.parameterType);

    // For selection fields, don't use additionalMetadata as HelpText (it contains options data)
    field.HelpText = field.ParameterType === 'selection'
      ? (metadata.helpText || '')
      : (metadata.additionalMetadata || metadata.helpText || '');

    field.DisplayOrder = metadata.displayOrder || (index * 10);

    // FIX 5: Always set value from DefaultValue to ensure it's populated on refresh
    field.value = field.DefaultValue;

    // --- DROPDOWN OPTIONS MAPPING ---
    if (field.ParameterType === 'selection') {
      let rawOptions: any = metadata.options || null;

      // Parse additionalMetadata for dropdown options
      if (!rawOptions && metadata.additionalMetadata) {
        const additional = metadata.additionalMetadata;

        if (typeof additional === 'string') {
          try {
            const parsed = JSON.parse(additional);

            if (typeof parsed === 'object' && !Array.isArray(parsed)) {
              // Format: { "Label": "Value", "Label2": "Value2" }
              rawOptions = Object.entries(parsed).map(([label, value]) => ({
                Plabel: label,
                Pvalue: value as string
              }));
            } else if (Array.isArray(parsed)) {
              // Format: [{ "value": "x", "label": "X" }, ...]
              rawOptions = parsed;
            }
          } catch (e) {
            // Not JSON — try comma or pipe delimited
            if (additional.includes('|')) {
              rawOptions = additional.split('|').map((s: string) => s.trim());
            } else if (additional.includes(',')) {
              rawOptions = additional.split(',').map((s: string) => s.trim());
            }
            console.warn(`Could not JSON-parse additionalMetadata for "${field.ParameterName}", tried delimiter split:`, rawOptions);
          }
        } else if (Array.isArray(additional)) {
          rawOptions = additional;
        } else if (typeof additional === 'object' && additional.options) {
          rawOptions = additional.options;
        }
      }

      // Also check param-level options as fallback
      if (!rawOptions) {
        rawOptions = param.options || param.allowedValues || param.values || null;
      }

      if (Array.isArray(rawOptions) && rawOptions.length > 0) {
        field.Options = rawOptions.map((opt: any) => {
          const option = new fieldOptions();
          if (typeof opt === 'string') {
            option.Pvalue = opt;
            option.Plabel = opt;
          } else {
            option.Pvalue = opt.Pvalue || opt.value || opt.id || String(opt);
            option.Plabel = opt.Plabel || opt.label || opt.name || opt.text || option.Pvalue;
          }
          return option;
        });
      }

      // Set default selection to matching option
      if (field.Options && field.Options.length > 0 && field.DefaultValue) {
        const matchingOption = field.Options.find(o => o.Pvalue === field.DefaultValue);
        if (matchingOption) {
          field.value = matchingOption.Pvalue;
        } else {
          // Try matching by label as fallback
          const matchByLabel = field.Options.find(o => o.Plabel === field.DefaultValue);
          if (matchByLabel) {
            field.value = matchByLabel.Pvalue;
          } else {
            console.warn(
              `Default value "${field.DefaultValue}" for "${field.ParameterName}" not found in options.`
            );
          }
        }
      }
    } else {
      // Non-selection fields: handle options if they exist (legacy support)
      if (metadata.options && Array.isArray(metadata.options)) {
        field.Options = metadata.options.map((opt: any) => {
          const option = new fieldOptions();
          option.Pvalue = opt.value || opt.Pvalue || opt;
          option.Plabel = opt.label || opt.Plabel || opt;
          return option;
        });
      }
    }

    if (metadata.templateS3Path) {
      field.TemplateS3Path = metadata.templateS3Path;
    }
    if (metadata.uploadSaveUrl) {
      field.UploadSaveUrl = metadata.uploadSaveUrl;
    }
    if (metadata.uploadRemoveUrl) {
      field.UploadRemoveUrl = metadata.uploadRemoveUrl;
    }

    return field;
  });

  fields.sort((a, b) => a.DisplayOrder - b.DisplayOrder);

  const result = new Fields();
  result.Parameters = fields;
  result.tags = processItem.tags || [];
  result.DXScriptS3Path = processItem.dxScriptS3Path || '';
  result.longDescription = processItem.longDescription || processItem.description || '';

  this.currentServiceFields = result;
  this.currentServiceSetup = fields;
  this.setupLoaded = true;

  // FIX 7: Emit the update so subscribers (UI components) get the new state
  this.emitUpdate();

  console.log('Mapped service fields:', result);
  console.log('Parameters count:', fields.length);
  console.log('Parameter details:', fields.map(f =>
    `${f.ParameterName}: type="${f.ParameterType}" value="${f.value}" default="${f.DefaultValue}" options=${f.Options?.length || 0}`
  ));
}



  // Central emit method to push state to subscribers
  private emitUpdate(): void {
    this.serviceFieldsSubject.next(this.currentServiceFields);
    this.serviceSetupSubject.next([...this.currentServiceSetup]);
  }

  onFileRemove(fileName: string) {
    console.log('service: on file remove/cancel ', fileName);
  }

  /**
   * Executes the process. Returns the Observable so the caller can handle refresh.
   */
  executeProcess(taskName: string): Observable<any> {
    const processItem = this.currentProcessItem;

    if (!processItem) {
      console.error('No process item available for execution');
      this.uiState.setErrorNotification('Unable to execute: no process loaded');
      return of(null);
    }

    const filledParams = this.currentServiceSetup.map(field => ({
      name: field.ParameterName,
      value: field.value !== undefined && field.value !== null ? field.value : (field.DefaultValue || ''),
      defaultValue: field.DefaultValue || '',
      parameterMetadata: {
        caption: field.Caption,
        parameterType: field.ParameterType,
        required: field.Required,
        displayOrder: field.DisplayOrder,
        additionalMetadata: field.HelpText || ''
      }
    }));

    const sk = processItem.SK || '';
    const uuid = sk.includes('#') ? sk.split('#')[1] : sk;

    if (!uuid) {
      console.error('No process UUID available for execution');
      this.uiState.setErrorNotification('Unable to execute: missing process ID');
      return of(null);
    }

    const headers = this.getHeaders();

    const body = {
  inputParameters: filledParams,
  myTag: processItem.myTags || processItem.tags || '',
  name: taskName || processItem.name || '',
  imageJpgBase64: processItem.imageJpgBase64 || '',
  start: processItem.start || '',
  finish: processItem.finish || ''
};

    console.log('Executing process:', processItem.name);
    console.log('Task name:', taskName);
    console.log('UUID:', uuid);
    console.log('Request body:', body);
    console.log('currentServiceSetup values:', this.currentServiceSetup.map(f => ({ name: f.ParameterName, value: f.value })));

    return this.http.post<any>(
      `${this.apiBase}/CPT/${uuid}/executeProcess`,
      body,
      { headers }
    );
  }

  currentFormAbandoned() {
    console.log('current form abandoned');
    // FIX 8: Reset the loaded flag so next load works cleanly
    this.setupLoaded = false;
  }

  getServiceSetup(id: string): Fields {
    return this.currentServiceFields;
  }
  resetFieldValuesToDefaults(): void {
    if (this.currentServiceSetup.length === 0) return;

    this.currentServiceSetup.forEach(field => {
      field.value = field.DefaultValue || '';
    });

    this.currentServiceFields.Parameters.forEach(field => {
      field.value = field.DefaultValue || '';
    });

    this.emitUpdate();
  }
}

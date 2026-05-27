
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiStateService } from './ui-state.service';

export class Field {
  ParameterName = '';
  Caption = '';
  Required = false;
  DefaultValue? = '';
  TemplateS3Path? = '';
  ParameterType = '';
  Options?: fieldOptions[] = [];
  DisplayOrder = 0;
  UploadSaveUrl? = '';
  UploadRemoveUrl? = '';
  HelpText? = '';
  value?: any;
  ShowHelpOnFocus?: boolean;

  constructor() {}
}

export class fieldOptions {
  Pvalue? = '';
  Plabel? = '';

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

  private apiBase = '/api';

  constructor(private uiState: UiStateService, private http: HttpClient) {
    this.uiState.abandonCurrentForm$.subscribe(() => {
      this.currentFormAbandoned();
    });
  }

  private getIdToken(): string {
    const keys = Object.keys(localStorage);
    const idTokenKey = keys.find(k => k.includes('idToken'));
    if (idTokenKey) {
      return localStorage.getItem(idTokenKey) || '';
    }
    return '';
  }

  private getHeaders(): HttpHeaders {
    const idToken = this.getIdToken();

    let partition = 'Org#99889cf5-670f-4460-8461-7556e88505d4';
    try {
      if (idToken && idToken.split('.').length === 3) {
        const payload = JSON.parse(atob(idToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        partition = (payload['custom:Org'] || partition).replace(/#$/, '');
      }
    } catch (e) {
      console.warn('Could not decode token for Partition header');
    }

    return new HttpHeaders({
      'Authorization': idToken,
      'Partition': partition
    });
  }

  /**
   * Maps API parameterType values to the field type keys used by FieldGeneratorDirective.
   * 
   * The directive's fieldMap uses these lowercase keys:
   *   "text", "file", "selection", "checkbox", "connectionstring", "password", "outputfile", "date"
   */
  private mapParameterType(apiType: string): string {
    if (!apiType) return 'text';

    const typeMap: { [key: string]: string } = {
      // Text variants → "text"
      'Text': 'text',
      'text': 'text',
      'String': 'text',
      'string': 'text',
      'TextArea': 'text',
      'textarea': 'text',
      'MultiLine': 'text',

      // Selection/Dropdown variants → "selection"
      'Selection': 'selection',
      'selection': 'selection',
      'Dropdown': 'selection',
      'dropdown': 'selection',
      'Select': 'selection',
      'select': 'selection',
      'ComboBox': 'selection',

      // File variants → "file"
      'File': 'file',
      'file': 'file',
      'Upload': 'file',
      'upload': 'file',

      // Output file → "outputfile"
      'OutputFile': 'outputfile',
      'outputfile': 'outputfile',
      'OutputFileTemplate': 'outputfile',

      // Checkbox/Boolean variants → "checkbox"
      'Checkbox': 'checkbox',
      'checkbox': 'checkbox',
      'Boolean': 'checkbox',
      'boolean': 'checkbox',
      'Toggle': 'checkbox',

      // Connection string → "connectionstring"
      'ConnectionString': 'connectionstring',
      'connectionstring': 'connectionstring',

      // Password → "password"
      'Password': 'password',
      'password': 'password',

      // Date variants → "date"
      'Date': 'date',
      'date': 'date',
      'DateTime': 'date',
      'datetime': 'date',

      // Number → "text" (no dedicated number component, text handles it)
      'Number': 'text',
      'number': 'text',
      'Integer': 'text',
    };

    return typeMap[apiType] || 'text'; // Default to text if unknown
  }

  /**
   * Accepts the full process item (which already has inputParameters on it)
   * and maps them into the Fields format the UI expects.
   * Resets state first to prevent stale data between tile switches.
   */
  loadServiceSetup(processItem: any): void {
    console.log('loadServiceSetup called with:', processItem);

    // RESET first — prevents stale data when switching tiles
    this.currentServiceFields = new Fields();
    this.currentServiceSetup = [];

    const inputParams = processItem.inputParameters || processItem.InputParameters || [];
    console.log('Input parameters found:', inputParams);

    if (inputParams.length === 0) {
      console.log('No input parameters defined for this process');
      return;
    }

    const fields: Field[] = inputParams.map((param: any, index: number) => {
      const metadata = param.parameterMetadata || {};
      const field = new Field();

      field.ParameterName = param.name || '';
      field.Caption = metadata.caption || param.name || '';
      field.Required = metadata.required === true || metadata.required === 'true';
      field.DefaultValue = param.defaultValue || param.value || '';
      field.ParameterType = this.mapParameterType(metadata.parameterType);
      field.HelpText = metadata.additionalMetadata || metadata.helpText || '';
      field.DisplayOrder = metadata.displayOrder || (index * 10);
      field.value = param.defaultValue || param.value || '';

      // Map options for Selection/dropdown types
      if (metadata.options && Array.isArray(metadata.options)) {
        field.Options = metadata.options.map((opt: any) => {
          const option = new fieldOptions();
          option.Pvalue = opt.value || opt.Pvalue || opt;
          option.Plabel = opt.label || opt.Plabel || opt;
          return option;
        });
      }

      // Map template/file paths
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

    // Sort by DisplayOrder
    fields.sort((a, b) => a.DisplayOrder - b.DisplayOrder);

    // Build the Fields object
    const result = new Fields();
    result.Parameters = fields;
    result.tags = processItem.tags || [];
    result.DXScriptS3Path = processItem.dxScriptS3Path || '';
    result.longDescription = processItem.longDescription || processItem.description || '';

    // Update local state
    this.currentServiceFields = result;
    this.currentServiceSetup = fields;

    console.log('Mapped service fields:', result);
    console.log('Parameters count:', fields.length);
    console.log('Parameter types:', fields.map(f => `${f.ParameterName}: ${f.ParameterType}`));
  }

  onFileRemove(fileName: string) {
    console.log('service: on file remove/cancel ', fileName);
  }

  onServiceSubmit(comment: string) {
    const commentField: any = {
      ParameterName: 'Comment',
      ParameterType: 'text',
      Caption: 'Comment',
      Required: false,
      DefaultValue: '',
      HelpText: '',
      DisplayOrder: 1010,
      value: comment,
    };
    this.currentServiceSetup.push(commentField);
    console.log('Submitting:', this.currentServiceFields);

    const headers = this.getHeaders();
    this.http.post<any>(`${this.apiBase}/Process/execute`, this.currentServiceSetup, { headers }).subscribe({
      next: data => {
        console.log('Execution response:', data);
      },
      error: error => {
        console.log('Execution error:', error);
        this.uiState.setErrorNotification(String(error.message));
      },
    });
  }

  currentFormAbandoned() {
    console.log('current form abandoned');
  }

  getServiceSetup(id: string): Fields {
    return this.currentServiceFields;
  }
}


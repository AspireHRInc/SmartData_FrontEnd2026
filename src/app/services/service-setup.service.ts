
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UiStateService } from './ui-state.service';
import { ServiceRunService } from './service-run.service';

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
  currentProcessItem: any = null;
  private setupLocked = false;

  private apiBase = '/api';

  constructor(
    private uiState: UiStateService,
    private http: HttpClient,
    private serviceRunService: ServiceRunService
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

    console.log('loadServiceSetup called with:', processItem);

    // RESET first — prevents stale data when switching tiles
    this.currentServiceFields = new Fields();
    this.currentServiceSetup = [];
    this.currentProcessItem = processItem;

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

      if (metadata.options && Array.isArray(metadata.options)) {
        field.Options = metadata.options.map((opt: any) => {
          const option = new fieldOptions();
          option.Pvalue = opt.value || opt.Pvalue || opt;
          option.Plabel = opt.label || opt.Plabel || opt;
          return option;
        });
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

    console.log('Mapped service fields:', result);
    console.log('Parameters count:', fields.length);
    console.log('Parameter types:', fields.map(f => `${f.ParameterName}: ${f.ParameterType}`));
  }

  onFileRemove(fileName: string) {
    console.log('service: on file remove/cancel ', fileName);
  }

  onServiceSubmit(comment: string) {
    const processItem = this.currentProcessItem;

    if (!processItem) {
      console.error('No process item available for execution');
      this.uiState.setErrorNotification('Unable to execute: no process loaded');
      return;
    }

    const filledParams = this.currentServiceSetup.map(field => ({
      name: field.ParameterName,
      value: field.value || field.DefaultValue || '',
      defaultValue: field.DefaultValue || '',
      parameterMetadata: {
        caption: field.Caption,
        parameterType: field.ParameterType,
        required: field.Required,
        displayOrder: field.DisplayOrder,
        additionalMetadata: field.HelpText || ''
      }
    }));

    if (comment) {
      filledParams.push({
        name: 'Comment',
        value: comment,
        defaultValue: '',
        parameterMetadata: {
          caption: 'Comment',
          parameterType: 'text',
          required: false,
          displayOrder: 9999,
          additionalMetadata: ''
        }
      });
    }

    const sk = processItem.SK || '';
    const uuid = sk.includes('#') ? sk.split('#')[1] : sk;

    if (!uuid) {
      console.error('No process UUID available for execution');
      this.uiState.setErrorNotification('Unable to execute: missing process ID');
      return;
    }

    const headers = this.getHeaders();

    const body = {
      inputParameters: filledParams,
      myTag: processItem.myTags || processItem.tags || '',
      name: processItem.name || ''
    };

    console.log('Executing process:', processItem.name);
    console.log('UUID:', uuid);
    console.log('Request body:', body);
    this.serviceRunService.lastExecutedServiceName = processItem.name || '';
    console.log('currentServiceSetup values:', this.currentServiceSetup.map(f => ({ name: f.ParameterName, value: f.value })));

    this.http.post<any>(
      `${this.apiBase}/ScheduledProcess/${uuid}/executeProcess`,
      body,
      { headers }
    ).subscribe({
      next: data => {
        console.log('Execution response:', data);
        this.unlockSetup();
        this.serviceRunService.refresh();
        setTimeout(() => this.serviceRunService.refresh(), 5000);
        setTimeout(() => this.serviceRunService.refresh(), 10000);
        setTimeout(() => this.serviceRunService.refresh(), 20000);
      },
      error: error => {
        console.error('Execution error:', error);
        this.unlockSetup();
        this.uiState.setErrorNotification(String(error.message));
        this.serviceRunService.refresh();
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


import { Injectable } from '@angular/core';
import setupData from './service-setup.data.json';
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
  currentServiceFields: Fields = setupData.currentServiceFields;

  // for testing
  // allServiceFields: fields = setupData.allServiceFields;

  currentServiceSetup: Field[] = setupData.currentServiceSetup;

  constructor(private uiState: UiStateService) {
    this.uiState.abandonCurrentForm$.subscribe(() => {
      this.currentFormAbandoned();
    });
  }

  onFileRemove(fileName: string) {
    console.log('service: on file remove/cancel ', fileName);
    // triggered on file cancel or file remove
    // TODO Tell server to flush file
  }

  onServiceSubmit(comment: string) {
    let commentField = {
      ParameterName: 'Comment',
      ParameterType: 'Text',
      Caption: 'Comment',
      Required: false,
      DefaultValue: '',
      HelpText: '',
      DisplayOrder: 1010,
      value: comment,
    };
    this.currentServiceSetup.push(commentField);
    console.log(this.currentServiceFields);
  }

  currentFormAbandoned() {
    console.log('current form abandoned');
    // TODO flush uploaded files from current form
  }

  getServiceSetup(id: string) {
    return this.currentServiceFields;
    // TODO Tell server to flush file
  }
}

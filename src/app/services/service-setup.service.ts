import { Injectable } from '@angular/core';
import setupData from './service-setup.data.json';

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
  constructor() {}

  currentServiceFields: Fields = setupData.currentServiceFields;

  // allServiceFields: fields = setupData.allServiceFields;

  currentServiceSetup: Field[] = [
    {
      ParameterName: 'TargetSystem',
      ParameterType: 'Selection',
      Caption: 'Target System',
      Required: true,
      DefaultValue: '',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      Options: [
        {
          Pvalue: 'System 1',
          Plabel: 'System 1',
        },
        {
          Pvalue: 'System 2',
          Plabel: 'System 2',
        },
      ],
      DisplayOrder: 1000,
      value: {
        Pvalue: 'System 1',
        Plabel: 'System 1',
      },
    },
    {
      ParameterName: 'UserFile1',
      ParameterType: 'File',
      Caption: 'User File',
      Required: true,
      DefaultValue: 'DefaultFilename.xlsx',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      UploadSaveUrl: 'saveUrl',
      UploadRemoveUrl: 'removeUrl',
      DisplayOrder: 5010,
      value: [
        {
          extension: '.jpg',
          name: '04-01.jpg',
          rawFile: {},
          size: 409850,
          state: 3,
          uid: '96d6b421-ce87-41a3-b482-b0e71170234f',
          httpSubscription: {
            closed: true,
            _parentage: null,
            _teardowns: null,
            isStopped: true,
            destination: null,
          },
        },
      ],
    },
    {
      ParameterName: 'UserName',
      ParameterType: 'Text',
      Caption: 'User Name',
      Required: true,
      DefaultValue: '',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      DisplayOrder: 1010,
      value: 'User',
    },
    {
      ParameterName: 'Password',
      Caption: 'Password',
      Required: true,
      DefaultValue: '',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      ParameterType: 'Password',
      DisplayOrder: 1020,
      value: '12345',
    },
    {
      ParameterName: 'PostingDate',
      Caption: 'Posting Date for External Posting (MM/DD/YYYY)',
      Required: true,
      DefaultValue: '',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      ParameterType: 'Date',
      DisplayOrder: 1030,
      value: '2022-05-13T07:00:00.000Z',
    },
    {
      ParameterName: 'SampleCheckbox',
      Caption: 'Sample Checkbox',
      Required: true,
      DefaultValue: '',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      ParameterType: 'CheckBox',
      DisplayOrder: 1030,
      value: false,
    },
    {
      ParameterName: 'PositionFilter',
      Caption: 'Position Filter (User * for all)',
      Required: true,
      DefaultValue: '',
      HelpText:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      ParameterType: 'Text',
      DisplayOrder: 1040,
      value: 'lkjklj',
    },
  ];

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
    console.log(this.currentServiceSetup);
  }

  currentFormAbandoned() {
    // TODO flush uploaded files from current form
  }

  getServiceSetup(id: string) {
    return this.currentServiceFields;
    // TODO Tell server to flush file
  }
}

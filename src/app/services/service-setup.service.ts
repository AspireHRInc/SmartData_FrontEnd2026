import { Injectable } from '@angular/core';
import setupData from './service-setup.data.json';

export class field {
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

  constructor() {}
}

export class fieldOptions {
  Pvalue? = '';
  Plabel? = '';

  constructor() {}
}

export class fields {
  tags: string[] = [];
  Parameters: field[] = [];
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

  currentServiceFields: fields = setupData.currentServiceFields;

  // allServiceFields: fields = setupData.allServiceFields;

  currenctServiceSetup: any = {
    TargetSystem: { Pvalue: 'System 1', Plabel: 'System 1' },
    UserFile: [
      {
        extension: '.jpg',
        name: '04-02.jpg',
        rawFile: {},
        size: 235171,
        state: 3,
        uid: 'a121a831-a732-40cb-b65d-b6f32442a905',
        httpSubscription: { closed: true, _parentage: null, _teardowns: null, isStopped: true, destination: null },
      },
    ],
    UserName: 'lkjkljlk',
    Password: 'lkkljlkj',
    PostingDate: '2022-05-13T07:00:00.000Z',
    PositionFilter: 'lkjklj',
  };

  onFileRemove(fileName: string) {
    console.log('on file remove', fileName);
    // TODO Tell server to flush file
  }
}

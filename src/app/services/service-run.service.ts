import { Injectable } from '@angular/core';
import { File } from './file.service';
import { UserService } from './user.service';

export enum ServiceRunStatus {
  'none' = 'none',
  'Scheduled' = 'Scheduled',
  'Processing' = 'Processing',
  'Processed with Errors' = 'Processed with Errors',
  'Completed' = 'Completed',
}

export class ServiceRun {
  id = '0';
  userId = 0;
  userName = '';
  processCode = '';
  targetSystemId = '';
  serviceId = '';
  serviceName = '';
  status: ServiceRunStatus[] = [ServiceRunStatus.none];
  submittedDate = new Date();
  startDate = new Date();
  endDate = new Date();
  durationHours = 0;
  newlyCompleted = false;
  comment = '';
  type = '';
  results?: ServiceRunResult[] = [];
  parameters: ServiceRunParameter[] = [];
  info?: (infoItem | ServiceRunResult)[] = [];

  constructor() {}
}

export class infoItem {
  id = '';
  type = '';
  label = '';
  detail = '';
}

export class ServiceRunResult {
  id = '';
  type = '';
  label = '';
  fileName?: string;
  filePath?: string;
  createDate?: Date;
  textResult? = '';
}

export class ServiceRunParameter {
  parameterName = '';
  parameterType = '';
  caption = '';
  required? = true;
  defaultValue = '';
  templateS3Path = '';
  displayOrder = 0;
  options? = [];

  constructor() {}
}

export class FilterGroup {
  name = '';
  filters: Filter[] = [];
}

export class Filter {
  value?: string | number;
  name = '';
}

export class Filters {
  dateRange = { start: new Date(0), end: new Date(0) };
  requester = [];
  service = [];
  status = [];
}

@Injectable({
  providedIn: 'root',
})
export class ServiceRunService {
  serviceRuns: ServiceRun[] = [
    {
      id: '1',
      userId: 2,
      userName: 'Jesse West',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '2',
      serviceName: 'Employee Data Scrambling',
      status: [ServiceRunStatus.Processing],
      submittedDate: new Date('May 01, 2022 10:00:00'),
      startDate: new Date('May 01, 2022 11:00:00'),
      endDate: new Date('May 02, 2022 11:00:00'),
      durationHours: 0,
      newlyCompleted: false,
      comment:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis ostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel ilium qui dolorem eum fugiat quo voluptas nulla pariatur?',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],
      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },

        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
    {
      id: '2',
      userId: 5,
      userName: 'Steven Fuller',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '2',
      serviceName: 'Employee Data Scrambling',
      status: [ServiceRunStatus.Processing],
      submittedDate: new Date('May 02, 2022 10:00:00'),
      startDate: new Date('May 02, 2022 11:00:00'),
      endDate: new Date('May 03, 2022 11:00:00'),
      durationHours: 0,
      newlyCompleted: false,
      comment: 'Grapefruit',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],

      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },

        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
    {
      id: '3',
      userId: 2,
      userName: 'Jesse West',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '2',
      serviceName: 'Employee Data Scrambling',
      status: [ServiceRunStatus.Completed],
      submittedDate: new Date('May 03, 2022 10:00:00'),
      startDate: new Date('May 03, 2022 11:00:00'),
      endDate: new Date('May 04, 2022 11:00:00'),
      durationHours: 12,
      newlyCompleted: false,
      comment:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis ostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel ilium qui dolorem eum fugiat quo voluptas nulla pariatur?',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      results: [
        {
          type: 'file',
          id: '12302',
          label: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          type: 'file',
          id: '12303',
          label: 'File Name',
          fileName: 'filename.xlsx',
          filePath: '/asset/results/samples/filename.xlsx',
          createDate: new Date(),
        },
      ],
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],
      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },

        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
    {
      id: '4',
      userId: 2,
      userName: 'Jesse West',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '2',
      serviceName: 'Employee Data Scrambling',
      status: [ServiceRunStatus['Processed with Errors'], ServiceRunStatus['Scheduled']],
      submittedDate: new Date('May 04, 2022 10:00:00'),
      startDate: new Date('May 04, 2022 11:00:00'),
      endDate: new Date('May 05, 2022 11:00:00'),
      durationHours: 0,
      newlyCompleted: false,
      comment:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis ostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel ilium qui dolorem eum fugiat quo voluptas nulla pariatur?',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      results: [
        {
          type: 'text',
          id: '12302',
          label: 'Different Result',
          textResult: 'Some text',
        },
      ],
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],
      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },

        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
    {
      id: '5',
      userId: 2,
      userName: 'Jesse West',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '2',
      serviceName: 'Employee Data Scrambling',
      status: [ServiceRunStatus.Completed, ServiceRunStatus['Scheduled']],
      submittedDate: new Date('May 05, 2022 10:00:00'),
      startDate: new Date('May 05, 2022 11:00:00'),
      endDate: new Date('May 06, 2022 11:00:00'),
      durationHours: 288,
      newlyCompleted: true,
      comment:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis ostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel ilium qui dolorem eum fugiat quo voluptas nulla pariatur?',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      results: [
        {
          type: 'file',
          id: '12302',
          label: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          type: 'file',
          id: '12303',
          label: 'File Name',
          fileName: 'filename.xlsx',
          filePath: '/asset/results/samples/filename.xlsx',
          createDate: new Date(),
        },
      ],
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],
      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },

        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
    {
      id: '6',
      userId: 2,
      userName: 'Jesse West',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '3',
      serviceName: 'Talent Pool Assignment',
      status: [ServiceRunStatus.Completed],
      submittedDate: new Date('May 06, 2022 10:00:00'),
      startDate: new Date('May 06, 2022 11:00:00'),
      endDate: new Date('May 07, 2022 11:00:00'),
      durationHours: 24,
      newlyCompleted: false,
      comment:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis ostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel ilium qui dolorem eum fugiat quo voluptas nulla pariatur?',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      results: [
        {
          type: 'file',
          id: '12302',
          label: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          type: 'file',
          id: '12303',
          label: 'File Name',
          fileName: 'filename.xlsx',
          filePath: '/asset/results/samples/filename.xlsx',
          createDate: new Date(),
        },
      ],
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],
      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },
        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
    {
      id: '7',
      userId: 2,
      userName: 'Jesse West',
      processCode: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
      targetSystemId: 'Ingles Development SSO',
      serviceId: '1',
      serviceName: 'Mass Requisition Upload',
      status: [ServiceRunStatus.Completed],
      submittedDate: new Date('May 07, 2022 10:00:00'),
      startDate: new Date('May 07, 2022 11:00:00'),
      endDate: new Date('May 08, 2022 11:00:00'),
      durationHours: 24,
      newlyCompleted: false,
      comment:
        'Lorem ipsum quia dolor sit amet consectetur adipisci velit sed qu ia nonnumquam eiusmodi empora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam quis ostrum exercitationem ullam corporis suscipit laboriosam nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel ilium qui dolorem eum fugiat quo voluptas nulla pariatur?',
      type: 'SuccessFactors Comma Delimited File (Double Header)',
      results: [
        {
          type: 'file',
          id: '12302',
          label: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          type: 'file',
          id: '12303',
          label: 'File Name',
          fileName: 'filename.xlsx',
          filePath: '/asset/results/samples/filename.xlsx',
          createDate: new Date(),
        },
      ],
      parameters: [
        {
          parameterName: 'TemplateFile',
          parameterType: 'File',
          caption: 'Upload Requisition Data Sheet',
          required: true,
          defaultValue: 'DefaultFilename.xlsx',
          templateS3Path: 'Templates/MANAGEPENDINGHIRE.xlsx',
          displayOrder: 5000,
        },
      ],
      info: [
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Process Code',
          detail: '1215113wffsdf-trhgfvbv-2415-4521b-dsgnslokn068',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Created By',
          detail: 'John Doe(Scheduled)',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Status',
          detail: 'Completed',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Start Date',
          detail: 'Mar 20 20:20:05',
        },

        {
          id: 'lkjlkj',
          type: 'text',
          label: 'End Date',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: '1 Day',
          detail: 'Mar 21 20:20:37',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Comment',
          detail: 'Type',
        },
        {
          id: 'lkjlkj',
          type: 'heading',
          label: 'Settings',
          detail: '',
        },

        {
          id: '12302',
          type: 'file',
          label: 'Old File',
          fileName: 'oldfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: '12302',
          type: 'file',
          label: 'New File',
          fileName: 'newfile.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
        },
        {
          id: 'lkjlkj',
          type: 'text',
          label: 'Type',
          detail: 'SuccessFactors Comma Delimited File (Double Header)',
        },
      ],
    },
  ];

  serviceRunsFilters: FilterGroup[] = [
    {
      name: 'Status',
      filters: [
        {
          name: 'Processing',
        },
        {
          name: 'Completed',
        },
        {
          name: 'Processed with Errors',
        },
      ],
    },
    {
      name: 'Requester',
      filters: [
        {
          name: 'Steven Fuller',
        },
        {
          name: 'Jesse West',
        },
      ],
    },

    {
      name: 'Date Range',
      filters: [{ name: 'Date Range' }],
    },
    {
      name: 'Service',
      filters: [
        {
          name: 'Employee Data Scrambling',
        },
        {
          name: 'Talent Pool Assignment',
        },
      ],
    },
  ];

  constructor(private userService: UserService) {}

  currentServicesRuns: ServiceRun[] = [...this.serviceRuns];

  currentFilters: string[] = [];

  filterServiceRuns(searchString: string, filters: Filters) {
    this.currentServicesRuns = [...this.serviceRuns];

    let filtersActive = false;

    if (
      filters.status.length > 0 ||
      filters.service.length > 0 ||
      filters.requester.length > 0 ||
      filters.dateRange.start !== new Date(0)
    ) {
      filtersActive = true;
    }

    if (filters.status.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.status.some(status => run.status.includes(status));
        }),
      ];
    }

    if (filters.requester.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.requester.some(
            requesterName => this.userService.getUserFullNameById(run.userId) === requesterName
          );
        }),
      ];
    }

    if (filters.service.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.service.some(serviceName => run.serviceName.includes(serviceName));
        }),
      ];
    }
    // every
    if (filters.dateRange.start.getTime() !== new Date(0).getTime()) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return (
            run.submittedDate.getTime() >= filters.dateRange.start.getTime() &&
            run.submittedDate.getTime() <= filters.dateRange.end.getTime()
          );
        }),
      ];
    }

    if (searchString !== '') {
      let searchStringArr: string[] = searchString.toLocaleLowerCase().split(' ');

      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          // let tags = service.metaTags.map(tag => tag.name);
          return searchStringArr.every(
            searchWord =>
              run.serviceName.toLocaleLowerCase().includes(searchWord) ||
              run.comment.toString().toLowerCase().includes(searchWord) ||
              run.userName.toString().toLowerCase().includes(searchWord)
          );
        }),
      ];
      return [...this.currentServicesRuns];
    }

    if (searchString === '' && !filtersActive) {
      console.log('else');
      this.currentServicesRuns = [...this.serviceRuns];
      return this.currentServicesRuns;
    }

    return this.currentServicesRuns;
  }

  cancelServiceRun(id: string) {
    console.log('cancel service run ', id);
  }
}

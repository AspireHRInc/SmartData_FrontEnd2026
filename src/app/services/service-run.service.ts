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
  results?: File[] = [];
  parameters: ServiceRunParameter[] = [];

  constructor() {}
}

export class ServiceRunResult extends File {
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
      id: '0',
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
    },
    {
      id: '0',
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
    },
    {
      id: '0',
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
          id: '12302',
          title: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          id: '12303',
          title: 'File Name',
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
    },
    {
      id: '0',
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
          id: '12302',
          title: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          id: '12303',
          title: 'File Name',
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
    },
    {
      id: '0',
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
          id: '12302',
          title: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          id: '12303',
          title: 'File Name',
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
    },
    {
      id: '0',
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
          id: '12302',
          title: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          id: '12303',
          title: 'File Name',
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
    },
    {
      id: '0',
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
          id: '12302',
          title: 'Compare Results',
          fileName: 'compareresults.xlsx',
          filePath: '/asset/results/samples/compareresults.xlsx',
          createDate: new Date(),
        },
        {
          id: '12303',
          title: 'File Name',
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
          name: 'Esther Neal',
        },
        {
          name: 'Jesse West',
        },
        {
          name: 'Brittany Watts',
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
    console.log('filterServiceRuns');
    console.log(filters);
    console.log('search string ', searchString);

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
          return filters.status.every(status => run.status.includes(status));
        }),
      ];
    }

    if (filters.requester.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.requester.every(
            requesterName => this.userService.getUserFullNameById(run.userId) === requesterName
          );
        }),
      ];
    }

    if (filters.service.length > 0) {
      this.currentServicesRuns = [
        ...this.currentServicesRuns.filter(run => {
          return filters.service.every(serviceName => run.serviceName.includes(serviceName));
        }),
      ];
    }

    if (filters.dateRange !== undefined) {
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
}

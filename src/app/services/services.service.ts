import { Injectable } from '@angular/core';

enum ServiceTag {
  'Mass Upload' = 'Mass Upload',
  'Reconciliation' = 'Reconciliation',
  'Human Resources' = 'Human Resources',
  'Payroll' = 'Payroll',
  'Recruiting' = 'Recruiting',
}

export interface Template {
  id: number;
  title: string;
  fileName: string;
  filePath: string;
}

export class Service {
  id = 0;
  name = '';
  imagePath = '';
  favorite = false;
  tags: ServiceTag[] = [];
  description = '';
  templates?: Template[] = [];

  constructor() {}
}

export class ServiceCategory {
  id = 0;
  name = '';
  featured = false;
  services: Service[] = [];
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  services: ServiceCategory[] = [
    {
      id: 1,
      name: 'Your Smart Suite',
      featured: false,
      services: [
        {
          id: 1,
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 2,
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          favorite: true,
          tags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 3,
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-3.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 4,
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 5,
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          favorite: true,
          tags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 6,
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: 'Hot',
      featured: true,
      services: [
        {
          id: 1,
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 2,
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          favorite: true,
          tags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 3,
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-3.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 4,
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 5,
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          favorite: false,
          tags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 6,
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: 'Recruiting',
      featured: false,
      services: [
        {
          id: 1,
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 2,
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          favorite: true,
          tags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 3,
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-3.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 4,
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 5,
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          favorite: true,
          tags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: 6,
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          favorite: false,
          tags: [ServiceTag['Mass Upload']],
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: 1,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: 2,
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
  ];

  constructor() {}
}

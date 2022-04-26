import { Injectable } from '@angular/core';

enum ServiceTag {
  'Mass Upload' = 'Mass Upload',
  'Reconciliation' = 'Reconciliation',
  'Human Resources' = 'Human Resources',
  'Payroll' = 'Payroll',
  'Recruiting' = 'Recruiting',
}

export interface Template {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
}

export class Service {
  id = '0';
  name = '';
  imagePath = '';
  weighting = 0;
  favorite = false;
  subscribed = false;
  displayTags: ServiceTag[] = [];
  metaTags: ServiceTag[] = [];
  shortDescription = '';
  description = '';
  templates?: Template[] = [];

  constructor() {}
}

export class ServiceCategory {
  id = '0';
  name = '';
  featured = false;
  defaultMaxTiles = 0;
  services: Service[] = [];
  constructor() {}
}

export class FilterCategory {
  id = '0';
  name = '';
  filters: Filter[] = [];
}

export class Filter {
  id = '0';
  name = '';
  subscribed = '';
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  currentServices: ServiceCategory[] = [];

  defaultServices: ServiceCategory[] = [
    {
      id: '1',
      name: 'Your Smart Suite',
      featured: false,
      defaultMaxTiles: 6,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '2',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.jpg',
          weighting: 0,
          favorite: true,
          subscribed: true,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '3',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-3.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '4',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-6.jpg',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '5',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: true,
          subscribed: true,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '7',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Hot',
      featured: true,
      defaultMaxTiles: 2,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-1-featured.jpg',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '2',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2-featured.jpg',
          weighting: 0,
          favorite: true,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '3',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-3.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '4',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '5',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Recruiting',
      featured: false,
      defaultMaxTiles: 9,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '2',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: true,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '3',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-3.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '4',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '5',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: true,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
  ];

  allServices: ServiceCategory[] = [
    {
      id: '1',
      name: 'All Services',
      featured: false,
      defaultMaxTiles: 0,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload 1',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '2',
          name: 'Employee Data Scrambling 2',
          imagePath: 'assets/images/services/card-images/service-2.jpg',
          weighting: 0,
          favorite: true,
          subscribed: true,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '3',
          name: 'Talent Pool Assignment 3',
          imagePath: 'assets/images/services/card-images/service-3.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '4',
          name: 'Mass Requisition Upload 4',
          imagePath: 'assets/images/services/card-images/service-6.jpg',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '5',
          name: 'Employee Data Scrambling 5',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: true,
          subscribed: true,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '6',
          name: 'Talent Pool Assignment 6',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '7',
          name: 'Talent Pool Assignment 7',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: true,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '8',
          name: 'Mass Requisition Upload 8',
          imagePath: 'assets/images/services/card-images/service-1-featured.jpg',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '9',
          name: 'Employee Data Scrambling 9',
          imagePath: 'assets/images/services/card-images/service-2-featured.jpg',
          weighting: 0,
          favorite: true,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '10',
          name: 'Talent Pool Assignment 10',
          imagePath: 'assets/images/services/card-images/service-3.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '11',
          name: 'Mass Requisition Upload 11',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '12',
          name: 'Employee Data Scrambling 12',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '13',
          name: 'Talent Pool Assignment 13',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '14',
          name: 'Mass Requisition Upload 14',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '15',
          name: 'Employee Data Scrambling 15',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: true,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '16',
          name: 'Talent Pool Assignment 16',
          imagePath: 'assets/images/services/card-images/service-3.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '17',
          name: 'Mass Requisition Upload 17',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '18',
          name: 'Employee Data Scrambling 18',
          imagePath: 'assets/images/services/card-images/service-2.png',
          weighting: 0,
          favorite: true,
          subscribed: false,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          metaTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '19',
          name: 'Talent Pool Assignment 19',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '20',
          name: 'Talent Pool Assignment 20',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '21',
          name: 'Talent Pool Assignment 21',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '22',
          name: 'Talent Pool Assignment 22',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
        {
          id: '23',
          name: 'Talent Pool Assignment 23',
          imagePath: 'assets/images/services/card-images/service-0.png',
          weighting: 0,
          favorite: false,
          subscribed: false,
          displayTags: [ServiceTag['Mass Upload']],
          metaTags: [ServiceTag['Mass Upload']],
          shortDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          description:
            'adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          templates: [
            {
              id: '1',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
            {
              id: '2',
              title: 'User File',
              fileName: 'user-file.xls',
              filePath: '/src/assets/templates/',
            },
          ],
        },
      ],
    },
  ];

  currentFilter = '';

  filters: FilterCategory[] = [
    {
      id: '1',
      name: 'Functional',
      filters: [
        {
          id: '1',
          name: 'Recruiting',
          subscribed: '2',
        },
        {
          id: '2',
          name: 'Human Resources',
          subscribed: '1',
        },
        {
          id: '3',
          name: 'Payroll',
          subscribed: '10',
        },
        {
          id: '4',
          name: 'Benefits',
          subscribed: '12',
        },
        {
          id: '5',
          name: 'Onboarding',
          subscribed: '4',
        },
        {
          id: '6',
          name: 'Succession Managements',
          subscribed: '0',
        },
        {
          id: '7',
          name: 'Compensation',
          subscribed: '0',
        },
        {
          id: '8',
          name: 'General File Comparison',
          subscribed: '0',
        },
        {
          id: '9',
          name: 'Time Managements',
          subscribed: '7',
        },
      ],
    },
    {
      id: '2',
      name: 'Purpose',
      filters: [
        {
          id: '1',
          name: 'Reconciliation',
          subscribed: '1',
        },
        {
          id: '2',
          name: 'Process Automation',
          subscribed: '0',
        },
        {
          id: '3',
          name: 'Health Checks',
          subscribed: '4',
        },
        {
          id: '4',
          name: 'Mass Upload',
          subscribed: '0',
        },
        {
          id: '5',
          name: 'Reporting',
          subscribed: '0',
        },
      ],
    },
  ];

  getServices(filter: string) {
    this.currentFilter = filter;
    if (filter === 'default') {
      return this.defaultServices;
    } else if (filter === 'all') {
      return JSON.parse(JSON.stringify(this.allServices));
    } else if (filter === 'favorites') {
      return this.favoritedServices();
    } else {
      let noService: ServiceCategory[] = [
        { id: '0', name: 'No Services Returned', featured: false, defaultMaxTiles: 0, services: [] },
      ];
      return noService;
    }
  }

  constructor() {}

  onUpdateFavoriteStatus(categoryId: string, serviceId: string, favorited: boolean) {
    // TODO update favorited status
    console.log('update favorited ', categoryId, serviceId, favorited);
  }

  onServiceSearch(searchField: string): ServiceCategory[] {
    if (this.currentFilter === 'default') {
      // For case where default view is being dispayed, search all
      if (searchField !== '') {
        this.currentServices = this.allServices;
        this.currentServices[0].name = 'Search Results';

        let searchFieldArr: string[] = searchField.toLocaleLowerCase().split(' ');

        this.currentServices[0].services = this.currentServices[0].services.filter(service => {
          return searchFieldArr.every(
            searchWord =>
              service.name.toLocaleLowerCase().includes(searchWord) ||
              service.metaTags.toString().toLowerCase().includes(searchWord) ||
              service.description.toLowerCase().includes(searchWord)
          );
        });
        return this.currentServices;
      } else {
        this.currentServices = this.allServices;
        this.currentServices[0].name = 'Search Results';
        return this.currentServices;
      }
    } else {
      // for case where filtered view is being displayed, search current view
      if (searchField !== '') {
        this.currentServices[0].name =
          this.currentFilter.charAt(0).toUpperCase() + this.currentFilter.slice(1) + ' Search Results';

        let searchFieldArr: string[] = searchField.toLocaleLowerCase().split(' ');

        this.currentServices[0].services = this.currentServices[0].services.filter(service => {
          return searchFieldArr.every(
            searchWord =>
              service.name.toLocaleLowerCase().includes(searchWord) ||
              service.metaTags.toString().toLowerCase().includes(searchWord) ||
              service.description.toLowerCase().includes(searchWord)
          );
        });
        return this.currentServices;
      } else {
        this.currentServices = this.allServices;
        this.currentServices[0].name = 'Search Results';
        return this.currentServices;
      }
    }
  }

  favoritedServices() {
    this.currentServices = [new ServiceCategory()];
    this.currentServices[0].name = 'Favorite Services';
    this.currentServices[0].defaultMaxTiles = 0;
    this.currentServices[0].services = this.allServices[0].services.filter(service => {
      return service.favorite === true;
    });

    return this.currentServices;
  }
}

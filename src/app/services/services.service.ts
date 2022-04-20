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

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  services: ServiceCategory[] = [
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
          imagePath: 'assets/images/services/card-images/service-2.png',
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
          imagePath: 'assets/images/services/card-images/service-0.png',
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
      id: '1',
      name: 'Hot',
      featured: true,
      defaultMaxTiles: 2,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
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
      id: '1',
      name: 'Recruiting',
      featured: false,
      defaultMaxTiles: 9,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-0.png',
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

  constructor() {}
}

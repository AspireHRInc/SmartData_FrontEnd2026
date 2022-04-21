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
          imagePath: 'assets/images/services/card-images/service-2.jpg',
          favorite: true,
          subscribed: true,
          displayTags: [ServiceTag['Reconciliation'], ServiceTag['Human Resources'], ServiceTag['Payroll']],
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
          imagePath: 'assets/images/services/card-images/service-6.jpg',
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
      id: '2',
      name: 'Hot',
      featured: true,
      defaultMaxTiles: 2,
      services: [
        {
          id: '1',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-1-featured.jpg',
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
      id: '3',
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

  allServices: ServiceCategory[] = [
    {
      id: '1',
      name: 'All Services',
      featured: false,
      defaultMaxTiles: 0,
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
          imagePath: 'assets/images/services/card-images/service-2.jpg',
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
          imagePath: 'assets/images/services/card-images/service-6.jpg',
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
        {
          id: '8',
          name: 'Mass Requisition Upload',
          imagePath: 'assets/images/services/card-images/service-1-featured.jpg',
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
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2-featured.jpg',
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
          id: '11',
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
          id: '12',
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
          id: '13',
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
        {
          id: '14',
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
          id: '15',
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
          id: '16',
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
          id: '17',
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
          id: '18',
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
          id: '19',
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
        {
          id: '20',
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
        {
          id: '21',
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
        {
          id: '22',
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
        {
          id: '23',
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

  favoriteServices: ServiceCategory[] = [
    {
      id: '1',
      name: 'Favorites',
      featured: false,
      defaultMaxTiles: 0,
      services: [
        {
          id: '2',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2.jpg',
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
          id: '9',
          name: 'Employee Data Scrambling',
          imagePath: 'assets/images/services/card-images/service-2-featured.jpg',
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
          id: '15',
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
          id: '18',
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
      ],
    },
  ];

  constructor() {}

  onUpdateFavoriteStatus(categoryId: string, serviceId: string, favorited: boolean) {
    // TODO update favorited status
    console.log('update favorited ', categoryId, serviceId, favorited);
  }
}

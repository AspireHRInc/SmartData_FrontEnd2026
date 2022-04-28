import { Injectable } from '@angular/core';

export enum ServiceTag {
  'Favorites' = 'Favorites',
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
  subscribed = false;
  displayTags: Tag[] = [];
  metaTags: Tag[] = [];
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

export class TagCategory {
  id = '0';
  name = '';
  tags: Tag[] = [];
}

export class Tag {
  id = '0';
  name = '';
  subscribed? = '';
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: true,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
          ],
          metaTags: [
            {
              id: '2-1',
              name: 'Reconciliation',
              subscribed: '1',
            },
            {
              id: '1-2',
              name: 'Human Resources',
              subscribed: '1',
            },
            {
              id: '3-1',
              name: 'Favorites',
              subscribed: '',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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
          subscribed: false,
          displayTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
          metaTags: [
            {
              id: '2-4',
              name: 'Mass Upload',
              subscribed: '0',
            },
          ],
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

  allTags: TagCategory[] = [
    {
      id: '1',
      name: 'Functional',
      tags: [
        {
          id: '1-1',
          name: 'Recruiting',
          subscribed: '2',
        },
        {
          id: '1-2',

          name: 'Human Resources',
          subscribed: '1',
        },
        {
          id: '1-3',
          name: 'Payroll',
          subscribed: '10',
        },
        {
          id: '1-4',
          name: 'Benefits',
          subscribed: '12',
        },
        {
          id: '1-5',
          name: 'Onboarding',
          subscribed: '4',
        },
        {
          id: '1-6',
          name: 'Succession Managements',
          subscribed: '0',
        },
        {
          id: '1-7',
          name: 'Compensation',
          subscribed: '0',
        },
        {
          id: '1-8',
          name: 'General File Comparison',
          subscribed: '0',
        },
        {
          id: '1-9',
          name: 'Time Managements',
          subscribed: '7',
        },
      ],
    },
    {
      id: '2',
      name: 'Purpose',
      tags: [
        {
          id: '2-1',

          name: 'Reconciliation',
          subscribed: '1',
        },
        {
          id: '2-2',
          name: 'Process Automation',
          subscribed: '0',
        },
        {
          id: '2-3',
          name: 'Health Checks',
          subscribed: '4',
        },
        {
          id: '2-4',
          name: 'Mass Upload',
          subscribed: '0',
        },
        {
          id: '2-5',
          name: 'Reporting',
          subscribed: '0',
        },
      ],
    },
    {
      id: '3',
      name: 'Meta',
      tags: [
        {
          id: '3-1',
          name: 'Favorites',
          subscribed: '',
        },
      ],
    },
  ];

  currentFilter = '';

  currentFilters: string[] = [];

  getServices() {
    let filter = this.currentFilter.toLocaleLowerCase();
    if (filter === '') {
      return this.defaultServices;
    } else if (filter === 'all') {
      return JSON.parse(JSON.stringify(this.allServices));
    } else if (filter === 'favorites') {
      return this.filterServices([filter]);
    } else {
      let noService: ServiceCategory[] = [
        { id: '0', name: 'No Services Returned', featured: false, defaultMaxTiles: 0, services: [] },
      ];
      return noService;
    }
  }

  filterServices(filters: string[]) {
    this.currentServices = [...JSON.parse(JSON.stringify(this.allServices))];
    this.currentServices[0].name = filters.toString().charAt(0).toUpperCase() + filters.toString().slice(1);

    this.currentServices[0].services = [
      ...this.currentServices[0].services.filter(service => {
        return filters.every(filter => {
          return service.metaTags
            .map(tag => tag.name)
            .toString()
            .toLowerCase()
            .includes(filter);
        });
      }),
    ];

    return this.currentServices;
  }

  filterServicesByTag() {
    this.currentServices = [...JSON.parse(JSON.stringify(this.allServices))];
    this.currentServices[0].name = this.currentFilters.join(' ');
    console.log(this.currentFilters);

    this.currentServices[0].services = [
      ...this.currentServices[0].services.filter(service => {
        return this.currentFilters.every(filter => {
          return service.metaTags
            .map(tag => tag.name)
            .toString()
            .toLowerCase()
            .includes(filter);
        });
      }),
    ];

    console.log(this.currentServices);

    return this.currentServices;
  }

  constructor() {}

  onServiceSearch(searchField: string): ServiceCategory[] {
    if (this.currentFilter === '') {
      this.currentFilter = 'all';
      return this.serviceSearch(searchField, this.currentFilter);
    } else {
      this.currentServices = [...this.getServices()];
      return this.serviceSearch(searchField, this.currentFilter);
    }
  }

  serviceSearch(searchString: string, searchTitle: string) {
    if (searchString !== '' || this.currentFilters.length > 0) {
      this.currentServices = [...this.getServices()];

      this.currentServices[0].name =
        'Search Results' +
        ((this.currentFilter === '' ? '' : ' in "' + this.currentFilter.charAt(0).toUpperCase()) +
          this.currentFilter.slice(1) +
          '"') +
        ((this.currentFilters.length === 0 ? '' : ' filtered by "' + this.currentFilters.join(', ')) + '"');

      let searchStringArr: string[] = searchString.toLocaleLowerCase().split(' ');
      let searchTagArray: string[] = this.currentFilters
        .map(filter => filter.split(' ').map(string => string.toLowerCase()))
        .flat();
      searchStringArr.unshift(...searchTagArray);

      console.log(searchStringArr);

      this.currentServices[0].services = [
        ...this.currentServices[0].services.filter(service => {
          let tags = service.metaTags.map(tag => tag.name);
          return searchStringArr.every(
            searchWord =>
              service.name.toLocaleLowerCase().includes(searchWord) ||
              service.metaTags.toString().toLowerCase().includes(searchWord) ||
              service.description.toLowerCase().includes(searchWord) ||
              service.metaTags
                .map(tag => tag.name)
                .toString()
                .toLowerCase()
                .includes(searchWord)
          );
        }),
      ];
      return [...this.currentServices];
    } else {
      console.log('else');
      this.currentServices = [...this.getServices()];
      return this.currentServices;
    }
  }

  toggleFavorite(serviceId: string, tags: Tag[]) {
    let favorite = tags.find(tag => tag.name === 'Favorites') === undefined ? false : true;

    if (!favorite) {
      favorite = true;
      tags.push({
        id: '3-1',
        name: 'Favorites',
      });
    } else {
      favorite = false;
      tags = tags.filter(tag => {
        return tag.name !== 'Favorites';
      });
    }

    // TODO: write tags with favorite back to service
  }
}

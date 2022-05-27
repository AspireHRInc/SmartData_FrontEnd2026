import { Injectable } from '@angular/core';
import { File } from './file.service';
import servicesData from './services.data.json';

export enum ServiceTag {
  'Favorites' = 'Favorites',
  'Mass Upload' = 'Mass Upload',
  'Reconciliation' = 'Reconciliation',
  'Human Resources' = 'Human Resources',
  'Payroll' = 'Payroll',
  'Recruiting' = 'Recruiting',
}

export enum Environments {
  'development' = 'development',
  'test' = 'test',
  'production' = 'production',
}

export interface Template extends File {}

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
  constructor() {}
}

export class Environment {
  id = '0';
  name = '';
  constructor() {}
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  currentServices: ServiceCategory[] = [];

  defaultServices: ServiceCategory[] = servicesData.defaultServices;

  allServices: ServiceCategory[] = servicesData.allServices;

  allTags: TagCategory[] = servicesData.allTags;

  evironments: Environment[] = servicesData.evironments;

  currentFilter = '';

  currentFilters: string[] = [];

  constructor() {}

  getServices() {
    let filter = this.currentFilter.toLocaleLowerCase();
    if (filter === '') {
      return this.defaultServices;
    } else if (filter === 'all') {
      return JSON.parse(JSON.stringify(this.allServices));
    } else if (filter === 'favorites') {
      this.currentFilters = [];
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
      // console.log('else');
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

  getServiceById(id: string): Service {
    return this.allServices[0].services.find(service => service.id === id)!;
  }

  getTemplateFile(id: string) {
    // TODO: get file from API
    console.log('get template file with ID: ', id);
  }

  requestService(id: string) {
    // TODO: request service
    console.log('Request service with ID: ', id);
  }
}

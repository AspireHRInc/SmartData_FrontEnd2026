
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { File } from './file.service';
import { Observable } from 'rxjs';

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
  defaultServices: ServiceCategory[] = [];
  allServices: ServiceCategory[] = [];
  allTags: TagCategory[] = [];
  evironments: Environment[] = [];
  currentFilter = '';
  currentFilters: string[] = [];
  private initialized = false;
  private baseUrl = '/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getIdToken();
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    const partition = (payload['custom:Org'] || '').replace(/#$/, '');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition,
    });
  }

  initialize(): void {
    if (this.initialized) return;
    this.initialized = true;
    this.loadProcessTypes();
  }

  private loadProcessTypes(): void {
    const headers = this.getHeaders();

    this.http.get<any>(`${this.baseUrl}/ScheduledProcess/list`, { headers }).subscribe(
      (response) => {
        console.log('Process list response:', response);
        const items = response.Items || [];
        const services: Service[] = items.map((item: any) => ({
          id: item.SK || item.id || '0',
          name: item.name || item.processTypeName || '',
          imagePath: item.defaultProcessTypeVersionSSObjectKey || '',
          weighting: 0,
          subscribed: true,
          displayTags: (item.tags || []).map((t: any) => ({ id: t.id || '0', name: t.name || t })),
          metaTags: (item.tags || []).map((t: any) => ({ id: t.id || '0', name: t.name || t })),
          shortDescription: item.description || '',
          description: item.description || '',
          inputparameters: item.inputParameters || [],
          templates: [],
        }));

        const category: ServiceCategory = {
          id: '1',
          name: 'All Services',
          featured: false,
          defaultMaxTiles: 100,
          services: services,
        };

        this.allServices = [category];
        this.defaultServices = [category];
      },
      (error) => console.error('Error loading process types:', error)
    );
  }

  getServices() {
    let filter = this.currentFilter.toLocaleLowerCase();
    if (filter === '' || this.defaultServices.length === 0) {
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
    if (!this.allServices.length || !this.allServices[0]?.services) {
      return [];
    }

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
  }

  getServiceById(id: string): Service {
    return this.allServices[0]?.services.find(service => service.id === id)!;
  }

  getTemplateFile(id: string) {
    console.log('get template file with ID: ', id);
  }

  requestService(processId: string) {
    console.log('Request service with ID: ', processId);
  }

  getProcessDetails(id: string): Observable<any> {
    return this.http.get(`/api/ScheduledProcess/${id}`, { headers: this.getHeaders() });
  }

  getProcessTypeVersion(ssObjectKey: string): Observable<any> {
  // ssObjectKey = "PTM#29e4718e-...#PTV#148973ee-..."
  // Just fetch the PTM item — it likely contains the PTV data
  const ptmId = ssObjectKey.split('#')[1];  // "29e4718e-f24b-421f-90f8-0ec3be068d71"
  return this.http.get(`/api/PTM/${ptmId}`, { headers: this.getHeaders() });
}


}


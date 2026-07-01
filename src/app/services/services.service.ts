
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { File } from './file.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  imageJpgBase64 = '';
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
  private loading = false;
  private baseUrl = environment.apiUrl;

  private readonly tileImageMap: Record<string, string> = {
    'Template Script': 'assets/images/tiles/template_script_icon.png',
    'EC Diamond Data Capture': 'assets/images/tiles/ec_diamond_data_capture_icon.png',
    'HeartBeat': 'assets/images/tiles/heartbeat_icon.png',
    'Test PT': 'assets/images/tiles/test_pt_icon.png',
    'Test SmartData Cloud Connector': 'assets/images/tiles/smartdata_cloud_connector_icon.png',
    'Clone of Test PT': 'assets/images/tiles/clone_test_pt_icon.png',
    'I9 Research': 'assets/images/tiles/i9_research_icon.png',
  };

  private readonly defaultTileImage = 'assets/images/tiles/default.png';

  constructor(private http: HttpClient, private authService: AuthService) {}

  //get a new token from auth service each time to ensure we have the latest token with partition info
  private getHeaders(): HttpHeaders {
    const token = this.authService.getIdToken(); //get the latest token from auth service

    if (!token) {
      console.warn('Token not available yet');
      return new HttpHeaders({ Authorization: '', Partition: '' });
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return new HttpHeaders({ Authorization: `Bearer ${token}`, Partition: '' });
    }

    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const partition = (payload['custom:Org'] || '').replace(/#$/, '');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Partition: partition,
    });
  }

  private getDefaultImage(serviceName: string): string {
    return this.tileImageMap[serviceName] || this.defaultTileImage;
  }

  initialize(): void {
    if (this.initialized || this.loading) return;
    this.loading = true;

    this.attemptLoad();
  }

  private attemptLoad(): void {
    const token = this.authService.getIdToken();
    if (!token) {
      console.warn('Token not ready, retrying in 1s...');
      setTimeout(() => this.attemptLoad(), 1000);
      return;
    }

    this.initialized = true;
    this.loadProcessTypes();
  }

  private loadProcessTypes(): void {
    const headers = this.getHeaders();

    this.http.get<any>(`${this.baseUrl}/CPT/list`, { headers }).subscribe(
      (response) => {
        console.log('Process list response:', response);

        const items = (response.Items || []).filter((item: any) => {
          const sk = item.SK || '';
          return sk !== 'CPT#CPT' && item.name && (item.status || '').toLowerCase() !== 'inactive';
        });

        const services: Service[] = items.map((item: any) => ({
          id: item.SK || item.id || '0',
          name: item.name || item.processTypeName || '',
          imagePath: this.getDefaultImage(item.name || item.processTypeName || ''),
          imageJpgBase64: '',
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
        this.loading = false;

        // The /CPT/list response is thin: no imageJpgBase64 and no start/finish.
        // Fetch each CPT's detail to (a) pull in its base64 image and
        // (b) hide tiles that aren't currently active (start <= now <= finish).
        this.enrichTiles(services, category);
      },
      (error) => {
        console.error('Error loading process types:', error);
        this.loading = false;
        if (error.status === 401) {
          console.warn('Got 401, retrying in 2s...');
          this.initialized = false;
          setTimeout(() => this.initialize(), 2000);
        }
      }
    );
  }

  // Lazily enrich each tile from the CPT detail endpoint (/CPT/{id} -> Items[0]):
  //   - set imageJpgBase64 so the tile renders its real image
  //   - drop the tile if it is not currently active (start <= now <= finish)
  // Tiles render immediately from the list, then update/remove as detail calls return.
  private enrichTiles(services: Service[], category: ServiceCategory): void {
    services.forEach((svc) => {
      const uuid = (svc.id || '').includes('#') ? svc.id.split('#')[1] : svc.id;
      if (!uuid || uuid === '0') return;

      this.http.get<any>(`${this.baseUrl}/CPT/${uuid}`, { headers: this.getHeaders() }).subscribe(
        (detail) => {
          const item = detail?.Items?.[0] || detail;
          if (!item) return;

          // image
          if (item.imageJpgBase64) {
            svc.imageJpgBase64 = item.imageJpgBase64;
          }

          // currently-active check: start <= now <= finish
          const now = Date.now();
          const start = item.start ? new Date(item.start).getTime() : NaN;
          const finish = item.finish ? new Date(item.finish).getTime() : NaN;
          const active = !isNaN(start) && !isNaN(finish) && start <= now && now <= finish;

          if (!active) {
            this.removeService(svc, category);
          }
        },
        (err) => console.warn(`Could not load detail for ${svc.name}:`, err?.status || err)
      );
    });
  }

  // Remove a service from the live category and the cached list/default arrays.
  private removeService(svc: Service, category: ServiceCategory): void {
    category.services = category.services.filter(s => s.id !== svc.id);
    if (this.allServices[0]) {
      this.allServices[0].services = this.allServices[0].services.filter(s => s.id !== svc.id);
    }
    if (this.defaultServices[0]) {
      this.defaultServices[0].services = this.defaultServices[0].services.filter(s => s.id !== svc.id);
    }
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

  toggleFavorite(serviceId: string, tags: Tag[]): Observable<any> {
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

    return this.http.put<any>(
      `${this.baseUrl}/CPT/${serviceId}`,
      { tags: tags },
      { headers: this.getHeaders() }
    );
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
    return this.http.get(`${this.baseUrl}/CPT/${id}`, { headers: this.getHeaders() });
  }

  getProcessTypeVersion(ssObjectKey: string): Observable<any> {
    const ptmId = ssObjectKey.split('#')[1];
    return this.http.get(`${this.baseUrl}/PTM/${ptmId}`, { headers: this.getHeaders() });
  }

  //resets the service to initial state - can be called on logout to clear out any data
  reset(): void {
    this.initialized = false;
    this.loading = false;
    this.allServices = [];
    this.defaultServices = [];
    this.currentServices = [];
    this.allTags = [];
    this.evironments = [];
    this.currentFilter = '';
    this.currentFilters = [];
  }
}

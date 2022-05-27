import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { trigger, transition, style, animate, state } from '@angular/animations';

import { TagCategory, Tag } from '../../services/services.service';
import { UiStateService } from '../../services/ui-state.service';

import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'ss-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.less'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(calc(100% + 40px))' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ transform: 'translateX(calc(100% + 40px))' }))]),
    ]),
  ],
})
export class FiltersComponent implements OnInit {
  @Input() opened = false;
  @Input() data: TagCategory[] = [];
  @Output() selectedFilters = new EventEmitter<string[]>();

  filters: FormGroup = this.fb.group({});

  private resize$ = new Subject<void>();
  private resizeUpdateInterval = 150;

  width = 480;
  height = 750;
  top = 0;
  left = 0;

  dragged = false;

  subscribedVisible = false;

  constructor(private fb: FormBuilder, public uiState: UiStateService) {}

  ngOnInit(): void {
    this.data = this.data.filter(data => data.id !== '3');

    this.data.forEach(filterCategory => {
      filterCategory.tags.forEach(filter => {
        this.filters.addControl(filter.name, new FormControl(false));
      });
    });

    this.setWindowDimensions();

    this.resize$.pipe(debounceTime(this.resizeUpdateInterval)).subscribe(_ => this.setWindowDimensions());

    this.filters.reset();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(e: Event) {
    this.resize$.next();
  }

  setWindowDimensions() {
    this.top = window.innerHeight / 2 - this.height / 2;
    if (this.top < 0) this.top = 0;
    this.left = window.innerWidth - this.width - 25;
    if (this.left < 0) this.left = 0;
  }

  close() {
    this.uiState.hideServiceFilters();
  }

  submit() {
    let filterValues = this.filters.value;
    let selectedFilters = Object.keys(filterValues).filter(key => filterValues[key] === true);
    this.selectedFilters.emit(selectedFilters);
    this.uiState.hideServiceFilters();
  }

  reset() {
    this.filters.reset();
    this.selectedFilters.emit([]);
    this.uiState.hideServiceFilters();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  dateFormat = 'dd/MM/yyyy';

  constructor() {}
}

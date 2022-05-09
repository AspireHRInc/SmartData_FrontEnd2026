import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  static hoursToGreatesUnit(hours: number) {
    return hours < 1
      ? hours + ' hr'
      : hours < 24
      ? hours + ' hrs'
      : hours / 24 < 7
      ? hours / 24 + ' days'
      : (hours / 24 / 7).toFixed(1) + ' weeks';
  }
}

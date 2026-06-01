import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  static hoursToGreatesUnit(hours: number): string {
    if (hours <= 0) return '0s';

    const totalSeconds = Math.floor(hours * 3600);

    if (totalSeconds < 60) {
      return totalSeconds + 's';
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h >= 24) {
      const days = hours / 24;
      if (days >= 7) {
        return (days / 7).toFixed(1) + ' weeks';
      }
      return Math.floor(days) + 'd ' + h % 24 + 'h';
    }

    if (h > 0) {
      return m > 0 ? h + 'h ' + m + 'm' : h + 'h';
    }

    return s > 0 ? m + 'm ' + s + 's' : m + 'm';
  }
}


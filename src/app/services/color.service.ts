import { Injectable } from '@angular/core';

export interface HSPResult {
  value: number;
  tone: 'light' | 'dark';
}

export enum AccentColor {
  none = '',
  blue = 'var(--color-cta)',
  blueLight = 'var(--color-cta-light)',
  yellow = 'var(--color-accent-1)',
  orange = 'var(--color-accent-2)',
  redOrange = 'var(--color-accent-3)',
  pink = 'var(--color-accent-4)',
  green = 'var(--accent-color-3)',
  aqua = 'var(--color-accent-6)',
  red = 'var(--color-accent-7)',
}

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  constructor() {}

  private static lightThreshold = 155;

  // Value should be a larger string that can be used to generate a hash from.
  // Default saturation and lightness values can be tweaked to make color pastel
  // or brighter, etc.
  static StringToHslColor(value: String, saturation = 80, lightness = 45) {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hue = hash % 360;
    // let hue = (hash * value.length) % 360;
    // console.log(value, Math.abs(hue), saturation, lightness);
    // if ((40 > hue && hue < 80) || (125 > hue && hue > 195)) {
    //   console.log('light color');
    //   return `hsl(${Math.abs(hue)}, ${saturation}%, ${lightness - 20}%)`;
    // }

    return `hsl(${Math.abs(hue)}, ${saturation}%, ${lightness}%)`;
  }

  // Color should be a hex string value like #FF00FF
  static ConvertToHSP(color: any): HSPResult {
    const originalValue = color;

    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    const r = color >> 16;
    const g = (color >> 8) & 255;
    const b = color & 255;

    // HSP  equation from http://alienryderflex.com/hsp.html
    let hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    // don't really need to round but it's easier to comprehend if we're debugging hsp values.
    hsp = parseInt(hsp.toFixed(2), 10);

    // keep for debugging / tuning of lightThreshold value.
    // console.log(`HSP value for ${originalValue} = ${hsp} (${hsp > this.lightThreshold ? 'light' : 'dark'})`);

    // Using the HSP value, determine whether the color is light or dark, but for us visually
    // we need to skew a bit in one direction (halfway is actually 127.5)
    if (hsp > this.lightThreshold) {
      return { value: hsp, tone: 'light' };
    } else {
      return { value: hsp, tone: 'dark' };
    }
  }

  static lightOrDark() {}

  static HexToRGBString(hex: any) {
    const out = (hex = hex.replace('#', ''))
      .match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
      .map(function (l: string) {
        return parseInt(hex.length % 2 ? l + l : l, 16);
      })
      .join(',');

    return out;
  }

  static HexToRGBAString(hex: any, opacity: number) {
    const out = ColorService.HexToRGBString(hex);
    return `${out}, ${isFinite(opacity) ? opacity : 1}`;
  }
}

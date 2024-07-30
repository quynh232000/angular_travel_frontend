import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatprice',
  standalone: true,
})
export class FormatpricePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === null || value === undefined) return '';
    const parts = value.toString().split('.');

    let formattedInteger = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (parts.length === 1) return formattedInteger;

    const decimalPart = parts[1].slice(0, 3); 
    formattedInteger += ',' + decimalPart;

    return formattedInteger;
  }
}

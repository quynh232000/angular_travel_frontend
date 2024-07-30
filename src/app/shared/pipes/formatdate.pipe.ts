import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatdate',
  standalone: true
})
export class FormatdatePipe implements PipeTransform {
  transform(value: Date): string {
    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

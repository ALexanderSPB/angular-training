import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value > 60) {
      return `${Math.floor(value / 60)}h ${value % 60}min`;
    } else return `${value}min`;
  }

}

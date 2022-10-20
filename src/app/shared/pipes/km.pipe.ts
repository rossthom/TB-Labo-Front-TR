import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'km'
})
export class KmPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return (value != undefined) ? this.metersToKm(value) : ""
  }

  metersToKm(value: number){
    return `${(value / 1000).toFixed(2)} km`
  }
}

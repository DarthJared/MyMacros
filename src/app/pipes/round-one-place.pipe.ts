import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundOnePlace'
})
export class RoundOnePlacePipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value * 10) / 10;
  }

}

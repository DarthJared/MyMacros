import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByOrder'
})
export class SortByOrderPipe implements PipeTransform {

  transform(value: any): any[] {
    const vals = Object.values(value);
    return vals.sort((n1: any, n2: any) => {
      if ( n1.name < n2.name ){
        return -1;
      }
      if ( n1.name > n2.name ){
        return 1;
      }
      return 0;
    });
  }

}

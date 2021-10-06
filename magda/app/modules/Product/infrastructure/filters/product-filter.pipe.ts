import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'productFilter',
  pure: false
})
export class ProductFilterPipe implements PipeTransform {

  transform(value: any, all?: string, name?: string, brand?: string, category?: string): any {
    if ( (name === '' && brand === '' && category === '' && all === '')) return value;
    const resultArray = [];
    for (const item of value)
      if ((item['brand'] == brand || item['brand'] == all)) resultArray.push(item);
      else if ((item['category'] == category || item['category'] == all)) resultArray.push(item);
      else if ((item['name'] == name || item['name'] == all)) resultArray.push(item);
      else if ((item['cod'] == name || item['cod'] == all)) resultArray.push(item);
      else if ((item['amount'] == name || item['amount'] == all)) resultArray.push(item);
      else if ((item['price'] == name || item['price'] == all)) resultArray.push(item);
    //  if ((item['name'] == name || item['name'] == all) && item['amount'] == '' ) resultArray.push(item);

    return resultArray;
  }

}

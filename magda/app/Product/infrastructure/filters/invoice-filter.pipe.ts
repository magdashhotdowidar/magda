import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'invoiceFilter',
  pure: false
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(value: any, customer?: string, date?: string): any {
    if (value.lenght === 0 || (customer === '' && date === '')) return value;
    const resultArray = [];
    for (const item of value)
      if (item['customerName'] === customer && item['date'] === date) resultArray.push(item);
      else if (item['customerName'] === customer && date === '') resultArray.push(item);
      else if (item['date'] === date && customer === '') resultArray.push(item);

    return resultArray;
  }

}

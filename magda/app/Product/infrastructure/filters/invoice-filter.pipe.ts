import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'invoiceFilter',
  pure: false
})
export class InvoiceFilterPipe implements PipeTransform {

  transform(value: any, invoiceNO?: number, date?: string): any {
    if (value.lenght === 0 || (invoiceNO === 0 && date.trim() === '')) return value;
    const resultArray = [];
    for (const item of value)
      if (item['invoiceNo'] === invoiceNO && item['date'] === date.trim()) resultArray.push(item);
      else if (item['date'] === date.trim() && invoiceNO === 0) resultArray.push(item);

    return resultArray;
  }

}

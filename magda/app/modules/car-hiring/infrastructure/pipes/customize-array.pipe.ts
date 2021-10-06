import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customizeArray',
  pure: false
})
export class CustomizeArrayPipe implements PipeTransform {

  transform(value: any[], index: number): any[] {

    if (index >= 0 && index < value.length) {
      const resultArray = [];
      let count: number = 1;
      for (let i = index; i < value.length && count < 13; i++,count++) resultArray.push(value[i])
      return resultArray;
    }
    if (value.length>12) return value.splice(0,12);
    else return value;
  }

}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortenArray',
  pure: false
})
export class ShortenِِArrayPipe implements PipeTransform {

  transform(value: any, limit: number): any {
    if (value.length > limit) {
      const resultArray = [];
      for (let i = 0; i < limit; i++) resultArray.push(value[i])
      return resultArray;
    }
    return value;
  }
}

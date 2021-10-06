import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'friendsFilter',
  pure: false
})
export class FriendsFilterPipe implements PipeTransform {

  transform(value: any, search?: string): any {
    if ( (search === '' )) return value;
    const resultArray = [];
    for (const item of value) {
      let name:string=item['username'];
      if (name.match(search)) resultArray.push(item);
    }
    return resultArray;
  }

}

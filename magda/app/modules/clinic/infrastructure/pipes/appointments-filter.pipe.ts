import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appointmentsFilter',
  pure: false
})
export class AppointmentsFilterPipe implements PipeTransform {

  transform(value: any, patient?: string, date?: string, reason?: string): any {
    if ( (patient === '' && date === '' && reason === '')) return value;
    const resultArray = [];
    for (const item of value)
      if (( item['patient']==patient )) resultArray.push(item);
      else if (( date.match(item['appointmentDate'])) ) resultArray.push(item);
      else if (( reason.match(item['reason']) )) resultArray.push(item);

    return resultArray;
  }

}

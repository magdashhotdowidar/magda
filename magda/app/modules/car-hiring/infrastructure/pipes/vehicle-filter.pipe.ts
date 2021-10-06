import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'vehicleFilter',
  pure: false
})
export class VehicleFilterPipe implements PipeTransform {

  transform(value: any, all?: string, plateNumber?: string, loading?: string, fee?: string): any {
    if ( (plateNumber === '' && loading === '' && fee === '' && all === '')) return value;
    const resultArray = [];
    for (const item of value)
      if ((item['plateNumber'] == plateNumber || item['plateNumber'] == all)) resultArray.push(item);
      else if ((item['dailyFee'] == fee || item['dailyFee'] == all)) resultArray.push(item);
      else if ((item['loadingCap'] == loading || item['loadingCap'] == all)) resultArray.push(item);
     /* else if ((item['deliverDroppingOffRemotely'] == type || item['deliverDroppingOffRemotely'] == all)) resultArray.push(item);
      else if ((item['price'] == fee || item['price'] == all)) resultArray.push(item);
      else if ((item['goesAbroad'] == fee || item['goesAbroad'] == all)) resultArray.push(item);
      else if ((item['seatingCap'] == fee || item['seatingCap'] == all)) resultArray.push(item);
      else if ((item['color'] == fee || item['color'] == all)) resultArray.push(item);
      else if ((item['numOfDoors'] == fee || item['numOfDoors'] == all)) resultArray.push(item);
      else if ((item['horsepowerHP'] == fee || item['horsepowerHP'] == all)) resultArray.push(item);
      else if ((item['wheelDriveType'] == fee || item['wheelDriveType'] == all)) resultArray.push(item);
      else if ((item['numberOfTires'] == fee || item['numberOfTires'] == all)) resultArray.push(item);*/

    return resultArray;
  }

}

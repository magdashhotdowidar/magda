export class VehicleDto {
  constructor(public id?: number,
              public plateNumber?: string,
              public imageName?: string,
              public vehicleType?: string,
              public dailyFee?: number,
              public numberOfTires?: number,
              public price?: number) {
  }
}

//--------------------------------
export class TruckDto extends VehicleDto {
  public loadingCap: number
}

export class TransportTruckDto extends TruckDto {
  public goesAbroad: boolean
}

export class SmallTruckDto extends TruckDto {
}

//-------------------------------
export class CarDto extends VehicleDto {
  public color: string;
  public seatingCap: number;
  public numOfDoors: number;
  public deliverDroppingOffRemotely: boolean;
}

export class SportsDto extends CarDto {
  public horsepowerHP: number;
}


export class SuvDto extends CarDto {
  public wheelDriveType: number;
}

export class SWDto extends CarDto {
  public loadingCap: number;
}

export class VehicleResponseDto {
  constructor(public vehicles: VehicleDto[],
              public availableVehicles:VehicleDto[],
              public cars: CarDto[],
              public trucks: TruckDto[],
              public transportTrucks: TransportTruckDto[],
              public sports: SportsDto[],
              public suvList: SuvDto[],
              public swList: SWDto[]) {
  }
}

export class ResponseWithDateModel {
  constructor(public startDate:string,
              public endDate:string){}
}

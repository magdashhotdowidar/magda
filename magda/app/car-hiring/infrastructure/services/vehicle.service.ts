import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {ResponseWithDateModel, TruckDto, VehicleDto, VehicleResponseDto} from "../models/vehicle.models";


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.TUTORIAL) + 'vehicle';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getVehicleByTypeOrPlateNumber(value:string):Observable<VehicleDto[]> {
    return this.http.get<VehicleDto[]>(`${this.baseUrl}/searchByTypeOrPlateNum/${value}`);
  }
  getVehiclesByType(value:string):Observable<VehicleDto[]> {
    return this.http.get<VehicleDto[]>(`${this.baseUrl}/searchByType/${value}`);
  }

  bookMe(obj:ResponseWithDateModel):Observable<VehicleResponseDto> {
    return this.http.put<VehicleResponseDto>(`${this.baseUrl}/book`,obj);
  }
  rentMeAndGiveLocation(obj:ResponseWithDateModel,location:string):Observable<VehicleResponseDto> {
    return this.http.put<VehicleResponseDto>(`${this.baseUrl}/rent/location/${location}`,obj);
  }
  rentMe(obj:ResponseWithDateModel):Observable<VehicleResponseDto> {
    return this.http.put<VehicleResponseDto>(`${this.baseUrl}/rent`,obj);
  }

  cancelMe(plateNum:string):Observable<VehicleResponseDto> {
    return this.http.get<VehicleResponseDto>(`${this.baseUrl}/cancel/${plateNum}`);
  }
  loadMe(amount:number):Observable<TruckDto[]> {
    return this.http.get<TruckDto[]>(`${this.baseUrl}/load/${amount}`);
  }
  dropMe(plateNum:string):Observable<VehicleResponseDto> {
    return this.http.get<VehicleResponseDto>(`${this.baseUrl}/drop/${plateNum}`);
  }

  saveVehicle(fd: FormData) {
    return this.http.post(`${this.baseUrl}`, fd, {responseType: 'text'});
  }

  deleteVehicle(num: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${num}`, {responseType: 'text'});
  }

  deleteAllVehicle(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAll`, {responseType: 'text'});
  }
  getVehicle(plateNum:string):Observable<VehicleDto> {
    return this.http.get<VehicleDto>(`${this.baseUrl}/getVehicle/${plateNum}`);
  }
  deleteAllVehicleNulls(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/isNull`, {responseType: 'text'});
  }

  getAllVehicles(): Observable<VehicleResponseDto> {
    return this.http.get<VehicleResponseDto>(`${this.baseUrl}`, {responseType: "json"});
  }

  getChartDataDailyFee():Observable<ChartData[]>{
    return this.http.get<ChartData[]>(`${this.baseUrl}/ChartDataDailyFee`)
  }
  getChartDataReservationCount():Observable<ChartData[]>{
    return this.http.get<ChartData[]>(`${this.baseUrl}/ChartDataReservationCount`)
  }

}
/////////////////////////////////////////
export class ChartData {
  public name:string;
  public count:number;

  constructor(name: string, count: number) {
    this.name = name;
    this.count = count;
  }
}



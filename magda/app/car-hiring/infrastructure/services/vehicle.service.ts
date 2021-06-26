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

  rentMeAndGiveLocation(start:string,end:string,num:string,location:string):Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/rent/location/${start}/${end}/${num}/${location}`);
  }
  rentMe(start:string,end:string,num:string):Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/rent/${start}/${end}/${num}`);
  }
  getVehicleByTypeOrPlateNumber(value:string):Observable<VehicleDto[]> {
    return this.http.get<VehicleDto[]>(`${this.baseUrl}/searchByTypeOrPlateNum/${value}`);
  }
  getVehicleByType(value:string):Observable<VehicleDto[]> {
    return this.http.get<VehicleDto[]>(`${this.baseUrl}/searchByType/${value}`);
  }

  bookMe(obj:ResponseWithDateModel,num:string):Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/book/${num}`,obj);
  }

  cancelMe(plateNum:string):Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/cancel/${plateNum}`);
  }
  loadMe(amount:number):Observable<TruckDto[]> {
    return this.http.get<TruckDto[]>(`${this.baseUrl}/load/${amount}`);
  }
  dropMe(plateNum:string):Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/drop/${plateNum}`);
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

}


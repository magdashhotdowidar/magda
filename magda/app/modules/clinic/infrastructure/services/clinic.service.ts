import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {Observable, Subject} from "rxjs";
import {AppointmentDto, ClinicResponseDto} from "../models/clinic.model";

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  setComponent:Subject<{option:string,showPic:boolean}>=new Subject<{option:string,showPic:boolean}>();
  private baseUrl = this.urlConfigService.getApiUrl(Modules.CLINIC) + 'clinic';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getAllAppointmentsHistory():Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.baseUrl}/AllAppointmentsHistory`);
  }
  getAllAppointmentsRegisteredOnline():Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.baseUrl}/AllAppointmentsRegisteredOnline`);
  }
  getAllAppointmentsToday():Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.baseUrl}/AllAppointmentsToday`);
  }
  getAllAppointmentsByDate(date:string):Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.baseUrl}/AllAppointmentsByDate/${date}`);
  }
  getAllAppointmentsByPatient(patient:string):Observable<ClinicResponseDto> {
    return this.http.get<ClinicResponseDto>(`${this.baseUrl}/AllAppointmentsByPatient/${patient}`);
  }

  registerAnAppointment(appointment:AppointmentDto) {
    return this.http.post<ClinicResponseDto>(`${this.baseUrl}`, appointment);
  }
  cancelAnAppointment(patient: string,date:string): Observable<ClinicResponseDto> {
    return this.http.delete<ClinicResponseDto>(`${this.baseUrl}/${patient}/${date}`);
  }


}



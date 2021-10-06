import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {Observable} from "rxjs";
import {ClinicResponseDto, DoctorDto, PatientDto, PersonDto} from "../models/clinic.model";

@Injectable({
  providedIn: 'root'
})
export class DoctorAndPatientService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.TUTORIAL) + 'clinic/doctorAndPatient';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }


  addPerson(person:PersonDto) {
    return this.http.post<ClinicResponseDto>(`${this.baseUrl}`, person);
  }
  deletePerson(name: string,personType:string): Observable<any> {//here i used header to practice it .it was possible passing it as normal path variable
    const headers:HttpHeaders=new HttpHeaders({'personType':personType});
    return this.http.delete(`${this.baseUrl}/${name}`, {headers:headers,responseType: 'text'});
  }
  getDoctorByNames(value:string):Observable<DoctorDto[]> {
    return this.http.get<DoctorDto[]>(`${this.baseUrl}/searchByDoctorNames/${value}`);
  }
  getPatientByNames(value:string):Observable<PatientDto[]> {
    return this.http.get<PatientDto[]>(`${this.baseUrl}/searchByPatientNames/${value}`);
  }


}



import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "./urlconfig.service";
import {Modules} from "../enums/modules.enum";


@Injectable({
  providedIn: 'root'
})
export class PrivacyService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.U) + 'privacy';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getPrivacyByUserAndProperty(user:string,property: string): Observable<PrivacyDTO> {
    return this.http.get<PrivacyDTO>(`${this.baseUrl}/${user}/${property}`);
  }

  createPrivacy(privacy:PrivacyDTO) {
    return this.http.post(`${this.baseUrl}`, privacy, {responseType: 'text'});
  }

  deletePrivacy(user:string,property: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${user}/${property}`, {responseType: 'text'});
  }
  updatePrivacy(privacy:PrivacyDTO) {
    return this.http.put(`${this.baseUrl}`, privacy, {responseType: 'text'});
  }


}

///////////////////////////////////////
export class PrivacyDTO {
  constructor(
    public user?:string,
    public property?: string,
    public propertyState?: boolean
  ) {}

}



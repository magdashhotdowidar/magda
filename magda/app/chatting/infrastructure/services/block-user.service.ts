import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";


@Injectable({
  providedIn: 'root'
})
export class BlockUserService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH) + 'blockingUser';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getAllBLockedUsers(user:string,): Observable<ChattingUser[]> {
    return this.http.get<ChattingUser[]>(`${this.baseUrl}/${user}`);
  }

  createBlockedUser(user:BlockUsersDTO) {
    return this.http.post(`${this.baseUrl}`, user, {responseType: 'text'});
  }

  deleteBlockedUser(user:string,blockedUser: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${user}/${blockedUser}`, {responseType: 'text'});
  }

}

///////////////////////////////////////
/////////////////////////////
export class BlockUsersDTO {
  constructor(public user:string,
              public blockedUser:string){}
}



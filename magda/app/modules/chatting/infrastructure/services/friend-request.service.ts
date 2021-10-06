import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";


@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

//  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/friend_request';
  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH) + 'friend_request';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {}

  getRequestByTo(to: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.baseUrl}/to/${to}`);
  }

  sendFriendRequest(friendRequest:FriendRequest):Observable<string>{
    return this.http.post(this.baseUrl,friendRequest,{responseType:"text"})
  }

  getRequestByFromAndTo(from: string, to: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.baseUrl}/${from}/${to}`);
  }

  deleteFriendRequest(from: string, to: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${from}/${to}`, {responseType: 'text'});
  }

}

///////////////////////////////////////
export class FriendRequest {
  constructor(
    public from?: string,
    public to?: string
  ) {
  }

}


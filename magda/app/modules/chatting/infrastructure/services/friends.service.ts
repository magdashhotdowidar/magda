import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  // private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/friend';
  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH) + 'friend';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getFriendByUserAndFriendName(userName: string, friendName: string): Observable<Friend> {
    return this.http.get<Friend>(`${this.baseUrl}/${userName}/${friendName}`);
  }

  getAllUserFriends(user: string): Observable<ChattingUser[]> {
    return this.http.get<ChattingUser[]>(`${this.baseUrl}/${user}`);
  }
  getCommonFriends(friend:Friend):Observable<ChattingUser[]>{
    return this.http.get<ChattingUser[]>(`${this.baseUrl}/common/${friend.userName}/${friend.friendName}`)
  }

  createFriend(friend: Friend) {
    return this.http.post(`${this.baseUrl}`, friend);
  }

  deleteFriend(userName: string, friendName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userName}/${friendName}`, {responseType: 'text'});
  }

  deleteAllUserFriends(userName: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userName}`, {responseType: 'text'});
  }

}

///////////////////////////////////////
export class Friend {
  constructor(
    public userName?: string,
    public friendName?: string
  ) {
  }

}



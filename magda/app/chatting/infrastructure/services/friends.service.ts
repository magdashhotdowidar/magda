
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";


@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/friend';

  constructor(private http: HttpClient) {
  }

  getFriendByUserAndFriendName(userName: string,friendName:string): Observable<Friend> {
    return this.http.get<Friend>(`${this.baseUrl}/${userName}/${friendName}`);
  }

  getAllUserFriends(user: string): Observable<ChattingUser[]> {
    return this.http.get<ChattingUser[]>(`${this.baseUrl}/${user}`);
  }

  createFriend(friend:Friend) {
    return this.http.post(`${this.baseUrl}`, friend);
  }

  deleteFriend(userName: string,friendName:string): Observable<any> {
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
  ) {}

}



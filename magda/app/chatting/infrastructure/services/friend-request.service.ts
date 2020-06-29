import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/friend_request';

  constructor(private http: HttpClient) {
  }

  getRequestByTo(to: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.baseUrl}/to/${to}`);
  }

  getRequestByFrom(from: string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.baseUrl}/from/${from}`);
  }

  getRequestByFromAndTo(from: string,to:string): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${this.baseUrl}/${from}/${to}`);
  }

  createFriendRequest(friendRequest:FriendRequest) {
    return this.http.post(`${this.baseUrl}`, friendRequest);
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


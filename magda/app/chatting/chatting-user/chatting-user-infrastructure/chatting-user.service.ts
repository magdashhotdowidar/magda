import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from "@angular/http";
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {Router} from "@angular/router";
import {ChattingUser} from "./chatting-user.model";

@Injectable()
export class ChattingUserService {
  readonly rootUrl = 'http://localhost:8081/springboot-crud-rest';

  constructor(private router: Router,
              private http: HttpClient) {
  }

  getUser(name: string): Observable<ChattingUser> {
    return this.http.get<ChattingUser>(`${this.rootUrl}/user/${name}`).pipe(map((user:ChattingUser)=>{
      if(!user['roles']) user.roles = [];
      if(!user['backgroundImage']||user.backgroundImage==null||user.backgroundImage=='')user.backgroundImage='1.jpg';
      if(!user['personalImage']||user.personalImage==null||user.personalImage=='')user.personalImage='1.jpg';
      return user;
    }));
  }

  getUsersByNameOrEmail(name: string): Observable<any> {
    return this.http.get(`${this.rootUrl}/userNameOrEmail/${name}`);
  }

  updateUser(fd:FormData): Observable<Object> {
    return this.http.put(`${this.rootUrl}/user`, fd);
  }

  getAllUsers() {
    return this.http.get(this.rootUrl + '/allUsers');
  }


}

///////////////////////////////////
export class Request {

  constructor(
    public username: string,
    public password: string) {
  }

}

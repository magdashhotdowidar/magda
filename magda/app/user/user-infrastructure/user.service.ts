import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Response} from "@angular/http";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from "@angular/router";

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8081/springboot-crud-rest/';

  constructor(private router: Router,
              private http: HttpClient) {
  }

  registerUser(user: User) {

    const body: User = {
      username: user.username,
      password: user.password,
      roles: user.roles,
      enabled: user.enabled
    }

    var reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + 'adduser', body, {headers: reqHeader});
  }

  userAuthentication(request: Request) {
    var reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + 'authenticate', request, {headers: reqHeader});
  }

  Logout() {
   this.removeLocalStorageItems();
    this.router.navigate(['/login']);
  }
  removeLocalStorageItems(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
  }

  getAllUsers() {

    return this.http.get(this.rootUrl + 'allUsers');
  }

}

///////////////////////////////////
export class Request {

  constructor(
    public username: string,
    public password: string) {
  }

}

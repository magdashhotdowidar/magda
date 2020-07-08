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
  readonly reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});

  constructor(private router: Router,
              private http: HttpClient) {
  }

  registerUser(user: User) {

    const body: User = {
      username: user.username,
      password: user.password,
      roles: user.roles,
      theUserAdmin:user.theUserAdmin,
      enabled: user.enabled
    }
    return this.http.post(this.rootUrl + 'adduser', body, {headers: this.reqHeader});
  }

  userAuthentication(request: Request) {
    return this.http.post(this.rootUrl + 'authenticate', request, {headers: this.reqHeader});
  }

  getAllAdmins(): Observable<string[]> {
    return this.http.get<string[]>(this.rootUrl + 'users/admins', {headers: this.reqHeader})
  }

  Logout() {
    this.removeLocalStorageItems();
    this.router.navigate(['/login']);
  }

  removeLocalStorageItems() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
  }


}

///////////////////////////////////
export class AuthenticationResponse {
  constructor(
    public jwttoken: string,
    public jwtUserName: string,
    public role: string,
    public theUserAdmin: string
  ) {
  }

}

export class Request {

  constructor(
    public username: string,
    public password: string) {
  }

}

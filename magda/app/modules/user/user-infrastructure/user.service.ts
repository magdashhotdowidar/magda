import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {Router} from "@angular/router";
import {LocalStorage} from "../../shared/enums/local-storage-coding.enum";
import {Modules} from "../../shared/enums/modules.enum";
import {URLConfigService} from "../../shared/services/urlconfig.service";
import {map} from "rxjs/operators";

@Injectable()
export class UserService {
  readonly rootUrl = this.urlConfigService.getApiUrl(Modules.U)
  readonly reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});

  constructor(private router: Router,
              private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  registerUser(user: User) {

    const body: User = {
      username: user.username,
      password: user.password,
      roles: user.roles,
      theUserAdmin: user.theUserAdmin,
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

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.rootUrl}/${name}`).pipe(map((user:User)=>{
      if(!user['roles']) user.roles = [];
      if (user.roles.length==0)user.selectedRole='';else user.selectedRole=user.roles[0];
      return user;
    }));
  }
  setUserVisitsCount(name: string, count:number): Observable<string> {
    return this.http.get<string>(`${this.rootUrl}u/${name}/${count}`);
  }
  setUserWithLS(user:User){
    localStorage.setItem(LocalStorage.User_Object,JSON.stringify(user))
  }
  getUserFromLS():User|null{//don't ever never set any field to null or undefined at least set it to '' and if it is an array set it to []
    let gson:string=localStorage.getItem(LocalStorage.User_Object);
    let userObj:User;
    if (gson) {
      userObj=JSON.parse(gson);
      userObj.selectedRole=userObj.roles[0]
      return userObj;
    }
    else return null;
}

  fakeRequestForTranslating() {
    return this.http.get(this.rootUrl + 'hello', {responseType: 'text',headers:{'No-Auth': 'True'}})
  }

  Logout() {
    this.removeLocalStorageItems();
    this.router.navigate(['/login']);
  }

  removeLocalStorageItems() {
    localStorage.removeItem(LocalStorage.token);
    localStorage.removeItem(LocalStorage.userName);
    localStorage.removeItem(LocalStorage.role);
    localStorage.removeItem(LocalStorage.admin);
    localStorage.removeItem(LocalStorage.User_Object)
  }


}

///////////////////////////////////
export class AuthenticationResponse {
  constructor(
    public user:any,
    public jwttoken: string,
    public jwtUserName: string,
    public role: string,
    public theUserAdmin: string,
    public userImage:string,
    public visitsCount:number
  ) {}

}

export class Request {

  constructor(
    public username: string,
    public password: string) {
  }

}

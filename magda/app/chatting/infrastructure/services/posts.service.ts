import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  // private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/message';
  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH) + 'post';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getUserPosts(user: string) {
    return this.http.get(`${this.baseUrl}/${user}/user`);
  }


  getUserFriendsPosts(user: string) {
    return this.http.get(`${this.baseUrl}/${user}`);
  }


  savePost(fd: FormData) {
    return this.http.post(`${this.baseUrl}`, fd);
  }

}

//-----------------------------------
export class Post {
  constructor(public message?:string,
              public user?:string,
              public picName?:string,
              public userPicName?:string,
              public date?:string,
              public length?:number){}
}



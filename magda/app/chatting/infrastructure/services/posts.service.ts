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

  getUserFriendsNotification(user: string):Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notification/${user}`);
  }

  savePost(fd: FormData) {
    return this.http.post(`${this.baseUrl}`, fd);
  }
  saveComment(post:Post) {
    return this.http.post(`${this.baseUrl}/comment`, post);
  }

  saveNotification(notification:Notification) {
    return this.http.post(`${this.baseUrl}/notification`, notification);
  }

}

//-----------------------------------
export class Post {
  constructor(
    public id?: number,
    public message?: string,
    public user?: string,
    public picName?: string,
    public userPicName?: string,
    public date?: string,
    public length?: number,
    public comments?: Comment[],
    public notification?:Notification,
    public likes?:number
  ) {}
}

//------------------------------------
export class Comment {
  public id?:number;
  public message?: string;
  public user?: string;
  public userPicName?: string;
  public date?: string;
  public length?: number

  constructor( message?: string, user?: string, userPicName?: string, date?: string,length?:number) {
    this.message = message;
    this.user = user;
    this.userPicName = userPicName;
    this.date = date;
    this.length = length;
  }
}

//----------------------------------
export class Notification{
  constructor(public id:number,
              public publisher:string,
              public message:string){}
}


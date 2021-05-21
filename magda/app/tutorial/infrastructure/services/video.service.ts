import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.TUTORIAL) + 'tutorial/video';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getVideos():Observable<MyVideo[]> {
    return this.http.get<MyVideo[]>(`${this.baseUrl}`);
  }
  getVideo(name:string):Observable<MyVideo[]> {
    return this.http.get<MyVideo[]>(`${this.baseUrl}/${name}`);
  }
  getChannelVideos(channel:string):Observable<MyVideo[]> {
    return this.http.get<MyVideo[]>(`${this.baseUrl}/channel/${channel}`);
  }

  saveVideo(fd: FormData) {
    return this.http.post(`${this.baseUrl}`, fd, {responseType: 'text'});
  }
  updateVideoViews(name: string, views:number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/viewsUpdate/${name}/${views}`);
  }

  deleteVideo(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`, {responseType: 'text'});
  }


}
//-----------------------------------
export class MyVideo{
  constructor(
    public name?:string,
    public channel?:string,
    public uploadDate?:string,
    public views?:number
  ) {}

}


import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {Modules} from "../../../shared/enums/modules.enum";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/message';
  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH) + 'message';

  constructor(private http: HttpClient,
              private urlConfigService: URLConfigService) {
  }

  getMessagesByFromAndTo(from: string, to: string) {
    return this.http.get(`${this.baseUrl}/${from}/${to}`);
  }

  getUnReadMessages(to: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/unRead/${to}`);
  }

  /*sendMessage(message: Message) {
    return this.http.post(`${this.baseUrl}`, message);
  }*/
  sendMessage(fd: FormData) {
    return this.http.post(`${this.baseUrl}`, fd);
  }

  setReadToTrue(from: string, to: string) {
    return this.http.get(`${this.baseUrl}/${from}/${to}/read`);
  }

}

///////////////////////////////////////
export class Message {
  constructor(
    public message?: string,
    public messageFrom?: string,
    public messageTo?: string,
    public date?: string,
    public imageName?:string,
    public read?: boolean
  ) {}

}



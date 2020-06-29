
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {Cart} from "../../../Product/infrastructure/models/Cart";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private baseUrl = 'http://localhost:8081/springboot-crud-rest/api/message';

  constructor(private http: HttpClient) {
  }

  getMessagesByFromAndTo(from: string,to:string){
    return this.http.get(`${this.baseUrl}/${from}/${to}`);
  }

  getUnReadMessages(to:string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/unRead/${to}`);
  }

  sendMessage(message:Message) {
    return this.http.post(`${this.baseUrl}`, message);
  }

 setReadToTrue(from:string,to: string) {
   return this.http.get(`${this.baseUrl}/${from}/${to}/read`);
  }

}

///////////////////////////////////////
export class Message {
  constructor(
    public message: string,
    public messageFrom: string,
    public messageTo:string,
    public date:string,
    public read:boolean

  ) {}

}



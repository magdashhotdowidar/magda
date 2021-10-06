import {Injectable} from '@angular/core';
import {Message} from "./messages.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {chatMessage, MessageType} from "../../../core/games/test-chat/test-chat.component";

@Injectable({
  providedIn: 'root'
})
export class WebSocketChattingService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH_WEBSOCKET) + 'chat';
  websocket: WebSocket;
  messagesFake: chatMessage[] = [];
  messages: Message[] = [];
  returnedMessages: Message[] = [];
  users: string[] = [];
  joinedArray: Joined[] = [];


  constructor(private urlConfigService: URLConfigService) {
  }

  public openWebSocket(useType: string) {
    this.websocket = new WebSocket(this.baseUrl);

    this.websocket.onopen = (event) => {
      console.log('open:', event);
    }

    this.websocket.onmessage = (event) => {

      if (useType == 'fake') {
        const message: chatMessage = JSON.parse(event.data);
        if (message.messageType =='chat') {
          this.messagesFake.push(message);
        } else {
          this.joinedArray.push(new Joined(message.user, message.messageType))
          setTimeout(() => {
            this.joinedArray.splice(0,1);
          }, 1000)
        }
      } else if (useType == 'real') {
        const obj: WebsocketObject = JSON.parse(event.data);
        if (obj.message != null) this.messages.push(obj.message);
        if (obj.user != '') {
               if (this.users.includes(obj.user.trim())) {
                 this.users.splice(this.users.indexOf(obj.user),1)
               }else this.users.push(obj.user.trim());
        }
      }
    }

    this.websocket.onclose = (event) => {
      console.log('closed:', event);
    }
  }

  public sendFakeMessage(message: chatMessage) {
    this.websocket.send(JSON.stringify(message));
  }

  public sendRealMessage(obj: WebsocketObject) {
    this.websocket.send(JSON.stringify(obj));
  }

  public getWebSocketMessages(from: string, to: string): Message[] {
    return this.returnedMessages = this.messages.filter(m => (m.messageFrom.match(from) && m.messageTo.match(to)) || (m.messageTo.match(from) && m.messageFrom.match(to)));
  }

  public closeWebSocket() {
    this.websocket.close();
  }
}

/////////////////////
export class WebsocketObject {
  public message?: Message;
  public user?: string;

  constructor(message?: Message, user?: string) {
    this.message = message;
    this.user = user;
  }

}

//------------------------
export class Joined {
  constructor(public user: string,
              public state: string) {
  }
}



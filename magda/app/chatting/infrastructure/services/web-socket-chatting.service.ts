import {Injectable} from '@angular/core';
import {Message} from "./messages.service";
import {Modules} from "../../../shared/enums/modules.enum";
import {HttpClient} from "@angular/common/http";
import {URLConfigService} from "../../../shared/services/urlconfig.service";
import {chatMessage} from "../../../core/games/test-chat/test-chat.component";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";

@Injectable({
  providedIn: 'root'
})
export class WebSocketChattingService {

  private baseUrl = this.urlConfigService.getApiUrl(Modules.CH_WEBSOCKET) + 'chat';
  websocket: WebSocket;
  messagesFake: chatMessage[] = [];
  messagesReal:Message[]=[];

  constructor(private urlConfigService: URLConfigService) {
  }

  public openWebSocket(useType:string) {
    this.websocket = new WebSocket(this.baseUrl);

    this.websocket.onopen = (event) => {
      console.log('open:', event);
    }

    this.websocket.onmessage=(event)=>{

      if(useType=='fake') {
        const message: chatMessage = JSON.parse(event.data);
        this.messagesFake.push(message);
      }else if (useType=='real'){
        const message: Message = JSON.parse(event.data);
        this.messagesReal.push(message);
      }
    }

    this.websocket.onclose=(event)=>{
      console.log('closed:',event);
    }
  }

  public sendFakeMessage(message:chatMessage){
    this.websocket.send(JSON.stringify(message));
  }

  public sendRealMessage(message:Message){
    this.websocket.send(JSON.stringify(message));
  }

  public closeWebSocket(){
    this.websocket.close();
  }
}

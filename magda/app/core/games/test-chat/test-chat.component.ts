import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketChattingService} from "../../../chatting/infrastructure/services/web-socket-chatting.service";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.css']
})
export class TestChatComponent implements OnInit, OnDestroy {

  constructor(public websocketService: WebSocketChattingService) {
  }

  ngOnInit() {
    this.websocketService.openWebSocket('fake');
  }

  sendMessage(sendForm: NgForm) {
    const message: chatMessage = new chatMessage(sendForm.value.user, sendForm.value.message);
    this.websocketService.sendFakeMessage(message);
    sendForm.controls.message.reset();
  }

  ngOnDestroy(): void {
    this.websocketService.closeWebSocket();
  }
}

export class chatMessage {
  constructor(public user: string,
              public message: string) {
  }

}

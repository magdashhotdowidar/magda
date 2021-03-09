import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketChattingService} from "../../../chatting/infrastructure/services/web-socket-chatting.service";
import {Path} from "../../../shared/enums/path.enum";
import {na} from "../../../user/sign-in/sign-in.component";
import {Coding} from "../../../shared/enums/coding.enum";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.css']
})
export class TestChatComponent implements OnInit, OnDestroy {

  ASaberWordAr:string=Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;

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

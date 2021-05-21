import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {
  WebSocketChattingService
} from "../../../chatting/infrastructure/services/web-socket-chatting.service";
import {Path} from "../../../shared/enums/path.enum";
import {na} from "../../../user/sign-in/sign-in.component";
import {Coding} from "../../../shared/enums/coding.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {HighContrastModeDetector} from "@angular/cdk/a11y";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-test-chat',
  templateUrl: './test-chat.component.html',
  styleUrls: ['./test-chat.component.css'],

})
export class TestChatComponent implements OnInit, OnDestroy{

  ASaberWordAr:string=Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;
  userName: string =localStorage.getItem(LocalStorage.userName);

  constructor(public websocketService: WebSocketChattingService) {
  }

  ngOnInit() {
    this.websocketService.openWebSocket('fake');
    this.setJoined();
  }

  setJoined(){
    //delay calling is important
    setTimeout(() => {
      this.websocketService.sendFakeMessage(new chatMessage(this.userName, '',MessageType.join));
    }, 1000)
  }

  sendMessage(sendForm: NgForm) {
    const message: chatMessage = new chatMessage(this.userName, sendForm.value.message,MessageType.chat);
    this.websocketService.sendFakeMessage(message);
    sendForm.controls.message.reset();
  }

  ngOnDestroy(): void {
    this.websocketService.sendFakeMessage(new chatMessage(this.userName, '',MessageType.leave))
    this.websocketService.closeWebSocket();
  }

}

export class chatMessage {
  constructor(public user: string,
              public message: string,
              public messageType:string) {}
}
//-----------------
export enum MessageType {
  chat='chat',
  join='joined',
  leave='leave'
}

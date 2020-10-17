import {AfterViewChecked, Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ChattingUserService} from "../../chatting-user/chatting-user-infrastructure/chatting-user.service";
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {HttpErrorResponse} from "@angular/common/http";
import { FriendService} from "../../infrastructure/services/friends.service";
import {Path} from "../../../shared/enums/path.enum";
import {Message, MessageService} from "../../infrastructure/services/messages.service";
import {formatDate} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreStates} from "../../infrastructure/store/store.store";
import { SendMessage} from "../../infrastructure/store/actions/message.action";

import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewChecked,DoCheck {

  @ViewChild('scrollMe',{static:false}) myScrollContainer: ElementRef;
  userName: string = localStorage.getItem(LocalStorage.userName);
  friendImagePath: string = Path.userImagePath;
  friends: ChattingUser[] = [];
  unReadMessages: Message[] = [];
  openChatWindow: boolean = true;
  minimizeChatWindow: boolean = false;
  openFriendsWindow: boolean = true;
  direction: string;
  chatWindows: Array<ChatWindow> = [];
  d: boolean = false
  search: string='';
 // messages_observe: Observable<Message[]>;

  constructor(private toastr: ToastrService,
              private userService: ChattingUserService,
              private friendService: FriendService,
              private messageService: MessageService,
              private title:Title,
              private store: Store<StoreStates>) {

  }

  ngOnInit() {
    this.title.setTitle(this.userName+' - main Page')
    this.loadFriends();
    this.loadUnreadMessages();
  }

  loadFriends() {
    this.friendService.getAllUserFriends(this.userName).subscribe((data: ChattingUser[]) => {
        this.friends = data;
       // console.log(this.friends)
      },
      (error: HttpErrorResponse) => alert(error.message))
  }

  loadUnreadMessages() {
    this.messageService.getUnReadMessages(this.userName).subscribe(data => this.unReadMessages = data,
      (error: HttpErrorResponse) => alert(error.message))
  }

  add(name: string) {
    this.openChatWindow = true;
    let contain: boolean = false
    for (let i of this.chatWindows) {
      if (i.windowName == name) contain = true;
    }
    if (this.chatWindows.length < 3 && !contain)
      this.messageService.getMessagesByFromAndTo(this.userName, name).subscribe((data: Message[]) => {
          if (data.length == 0) data.push(new Message('Hi ' + this.userName, this.userName, '', '', false));
          this.chatWindows.push(new ChatWindow(name, data, '', true));
          this.messageService.setReadToTrue(name, this.userName).subscribe(data => this.unReadMessages = []);
        },
        (error: HttpErrorResponse) => alert(error.message))

  }

  ngAfterViewChecked(): void {
    this.direction = localStorage.getItem('direction');
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngDoCheck(): void {
  //  this.messages_observe = this.store.select('messages')
  }

  closeWindow(i: number) {
    this.openChatWindow = true;
    this.chatWindows.splice(i, 1);
  }

  send(i: number) {
    let date: string = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
    let m: Message = new Message(this.chatWindows[i].message, this.userName, this.chatWindows[i].windowName, date, false)

    this.store.dispatch(new SendMessage(m))
    this.store.subscribe((data: StoreStates) => {
      this.chatWindows[i].message = '';
      if (data.messages != null)
        this.chatWindows[i].chat = data.messages
    })
  }

  getUser(user: string) {
    /*  this.userService.getUser(user).subscribe((data:ChattingUser)=>this.friends=data.friends,
        (error:HttpErrorResponse) =>alert(error.message) )*/
  }

}

////////////////////////////////////////////
export class ChatWindow {
  chat: Message[] = [];
  message: string
  showWindow: boolean
  windowName: string;

  constructor(windowName: string, chat?: Message[], message?: string, showWindow?: boolean) {
    this.chat = chat;
    this.message = message;
    this.showWindow = showWindow;
    this.windowName = windowName;
  }
}

import {
  AfterViewChecked,
  Component,
  DoCheck,
  ElementRef, EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import b64toBlob from 'b64-to-blob';
import {ChattingUserService} from "../../chatting-user/chatting-user-infrastructure/chatting-user.service";
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {FriendService} from "../../infrastructure/services/friends.service";
import {Path} from "../../../shared/enums/path.enum";
import {Message, MessageService} from "../../infrastructure/services/messages.service";
import {formatDate} from "@angular/common";
import {Store} from "@ngrx/store";
import {StoreStates} from "../../infrastructure/store/store.store";
import {SendMessage} from "../../infrastructure/store/actions/message.action";

import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Post, PostService, Comment, Notification} from "../../infrastructure/services/posts.service";
import {Product} from "../../../Product/infrastructure/models/product";
import {updateContainerClass} from "ngx-bootstrap/positioning/utils";
import {WebSocketChattingService} from "../../infrastructure/services/web-socket-chatting.service";
import {WebcamImage} from "ngx-webcam";


@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewChecked, DoCheck, OnDestroy {

  @ViewChild('scrollMe', {static: false}) myScrollContainer: ElementRef;
  date: string = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
  userName: string = localStorage.getItem(LocalStorage.userName);
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  friendImagePath: string = Path.userImagePath;
  postImagePath: string = Path.postImagePath;
  chatImagePath:string=Path.chatImagePath;
  backgroundImagePath: string = Path.backgroundPath;
  fileEvent: Event = null;
  selectedFile: File;
  friends: ChattingUser[] = [];
  post: Post = new Post();
  comment: string;
  commentsNo: number = 2;
  posts: Post[] = []
  unReadMessages: Message[] = [];
  openChatWindow: boolean = true;
  minimizeChatWindow: boolean = false;
  openFriendsWindow: boolean = true;
  direction: string;
  chatWindows: Array<ChatWindow> = [];
  d: boolean = false
  search: string = '';
  openCamera: boolean = false;
  webcamImage: WebcamImage = null;
  takePicture: boolean = false;

  // messages_observe: Observable<Message[]>;

  constructor(private toastr: ToastrService,
              private userService: ChattingUserService,
              private friendService: FriendService,
              private messageService: MessageService,
              private postService: PostService,
              private title: Title,
              private store: Store<StoreStates>,
              private webSocket: WebSocketChattingService) {

  }

  ngOnInit() {
    this.title.setTitle(this.userName + ' - main Page')
    this.loadFriends();
    this.loadUnreadMessages();
    this.loadPublishedPosts();
    this.webSocket.openWebSocket('real');
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

  loadPublishedPosts() {
    this.postService.getUserFriendsPosts(this.userName).subscribe((data: Post[]) => {
        /* for (let post of data) {
           post.length = 30;
           for(let comment of post.comments)comment.length=30;
         }*/
        this.posts = data
      },
      (err: HttpErrorResponse) => alert(err.message))
  }

  add(name: string) {
    this.openChatWindow = true;
    let contain: boolean = false
    for (let i of this.chatWindows) {
      if (i.windowName == name) contain = true;
    }
    if (this.chatWindows.length < 3 && !contain)
      this.messageService.getMessagesByFromAndTo(this.userName, name).subscribe((data: Message[]) => {
          if (data.length == 0) data.push(new Message('Hi ' + this.userName, this.userName, '', '','', false));
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
    } catch (err) {
    }
  }

  ngDoCheck(): void {
    //  this.messages_observe = this.store.select('messages')
  }

  closeWindow(i: number) {
    this.openChatWindow = true;
    this.chatWindows.splice(i, 1);
  }

  send(i: number) {
    if (this.chatWindows[i].message != null && this.chatWindows[i].message != '' && this.chatWindows[i].message.length > 0) {
      let m: Message = new Message(this.chatWindows[i].message, this.userName, this.chatWindows[i].windowName, this.date,'', false)
      const fd = new FormData();
      this.webSocket.sendRealMessage(m);
      if(this.webcamImage!=null) {
        let contentTypeAndBase64Url: string[] = [];
        contentTypeAndBase64Url = this.webcamImage.imageAsDataUrl.split(';')
        const contentType: string = contentTypeAndBase64Url[0].split(':')[1];
        const realData: string = contentTypeAndBase64Url[1].split(',')[1];
        const blob = b64toBlob(realData, contentType);
        fd.append('image', blob);
        this.webcamImage=null;
      }
      fd.append('message',JSON.stringify(m));
      this.messageService.sendMessage(fd).subscribe(data => {
          let messages: Message[] = this.webSocket.messagesReal;

          this.chatWindows[i].message = '';
          if (messages != null)
            this.chatWindows[i].chat = messages;
          // this.chatWindows[i].chat=[...this.chatWindows[i].chat,...messages];
        },
        (error: HttpErrorResponse) => alert(error.message));

      /* this.store.dispatch(new SendMessage(m))
       this.store.subscribe((data: StoreStates) => {
         this.chatWindows[i].message = '';
         if (data.messages != null) {
           this.chatWindows[i].chat = data.messages;
         }
       })*/
    }
  }

  savePost() {
    const fd = new FormData();
    if (this.fileEvent != null) {
      this.selectedFile = (<HTMLInputElement>this.fileEvent.target).files[0];
      fd.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.post.comments == null) this.post.comments = [];
    this.post.user = this.userName;
    this.date = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
    this.post.date = this.date;
    this.post.userPicName = this.userImage;
    this.post.picName = this.selectedFile.name;
    this.post.length = 30;
    let notificationMessage: string = (this.post.message.length > 15) ? this.userName + ' posted ' +
      this.post.message.substring(0, 15) + '...' : this.userName + ' posted ' + this.post.message;
    this.post.notification = new Notification(0, this.userName, notificationMessage);
    fd.append('post', JSON.stringify(this.post));
    this.post = new Post();
    this.fileEvent = null;
    this.selectedFile = null;

    this.postService.savePost(fd).subscribe(data => this.toastr.success('posted successfully'),
      (error: HttpErrorResponse) => alert(error.message))

  }

  saveComment(post: Post, saveCommentOrUpdateLikes: string) {
    if (saveCommentOrUpdateLikes == 'comment') {
      if (post.comments == null) post.comments = [];
      let notificationMessage: string = (post.message.length > 15) ? this.userName + ' commented on '
        + post.message.substring(0, 15) + '...' : this.userName + ' commented on ' + post.message;
      post.notification = new Notification(0, this.userName, notificationMessage);
      this.date = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
      post.comments.push(new Comment(this.comment, this.userName, this.userImage, this.date, 30))
      /*post.comments.reverse();*/
      this.comment = '';
    }

    if (saveCommentOrUpdateLikes == 'updatePostLikes') {
      let notificationMessage: string = (post.message.length > 15) ? this.userName + ' admired with '
        + post.message.substring(0, 15) + '...' : this.userName + ' admired with ' + post.message;
      post.notification = new Notification(0, this.userName, notificationMessage);
      post.likes += 1;
    }

    this.postService.saveComment(post).subscribe(data => this.toastr.success('posted successfully'),
      (error: HttpErrorResponse) => alert(error.message))

  }

  takepictureMethod() {
    this.takePicture = true;
    this.openCamera = false;
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  ngOnDestroy(): void {
    this.webSocket.closeWebSocket();
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



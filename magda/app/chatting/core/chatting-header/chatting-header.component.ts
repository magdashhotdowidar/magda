import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../user/user-infrastructure/user.service";
import {FriendRequest, FriendRequestService} from "../../infrastructure/services/friend-request.service";
import {ChattingUserService} from "../../chatting-user/chatting-user-infrastructure/chatting-user.service";
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {Coding} from "../../../shared/enums/coding.enum";
import {Friend, FriendService} from "../../infrastructure/services/friends.service";
import {ToastrService} from "ngx-toastr";
import {Message, MessageService} from "../../infrastructure/services/messages.service";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {na} from "../../../user/sign-in/sign-in.component";
import {PostService,Notification} from "../../infrastructure/services/posts.service";
import {Path} from "../../../shared/enums/path.enum";


@Component({
  selector: 'chatting-header',
  templateUrl: './chatting-header.component.html',
  styleUrls: ['./chatting-header.component.css']
})
export class ChattingHeaderComponent implements OnInit {

  @Output() showing = new EventEmitter<boolean>();
  @Output() right_direction = new EventEmitter<boolean>();

  selectedLang: string = 'ar'
  userName: string = localStorage.getItem(LocalStorage.userName);
  userImage:string= localStorage.getItem(LocalStorage.userImage);
  userImagePath:string=Path.userImagePath;
  ASaberWordAr:string=Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;
  role: string = localStorage.getItem(LocalStorage.role);
  l: typeof LocalStorage = LocalStorage;
  roleAdmin: string = this.l.ROLE_ADMIN;

  usersForSearch: ChattingUser[] = [];
  friendRequests: FriendRequest[] = [];
  messages: Message[] = [];
  notifications:Notification[]=[];

  activated: boolean = false;
  dorpDownSearchInput: boolean = false;
  dropDownOpened: boolean = false;
  dropDownOpened1: boolean = false;
  dropDownOpened2: boolean = false;
  dropDownOpened3: boolean = false;
  friendRequestShowed: boolean = false;
  messagesShowed: boolean = false;
  notificationsShowed: boolean=false;


  constructor(private router: Router,
              private userService: UserService,
              private friendRequestService: FriendRequestService,
              private friendService: FriendService,
              private messageService: MessageService,
              private postService:PostService,
              private chattingUserService: ChattingUserService,
              private translate: TranslateService,
              private toastr: ToastrService) {
  }

  ngOnInit() {

    this.setLang();
    this.getFriendRquests();
    this.getMessages();
    this.getNotifications();
  }

  setLang() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');
    this.translate.use(this.selectedLang.match(/en|ar/) ? this.selectedLang : "ar");
    if (this.selectedLang == 'ar') {
      this.right_direction.emit(true);
      localStorage.setItem('direction', 'rtl');
    } else {
      this.right_direction.emit(false);
      localStorage.setItem('direction', 'ltr');
    }
  }

  getUserByNameOrEmail(nameOrEmail: string) {

    if (nameOrEmail != '' || nameOrEmail != null || nameOrEmail != undefined || nameOrEmail.length > 0)
      this.chattingUserService.getUsersByNameOrEmail(nameOrEmail).subscribe(
        data => {
          this.usersForSearch = data;
          this.dorpDownSearchInput = true;
          // console.log(this.usersForSearch);
        },
        (error: HttpErrorResponse) =>{ if (nameOrEmail==''){}else alert(error.message)})
    }


  getFriendRquests() {
    this.friendRequestService.getRequestByTo(this.userName).subscribe(data => {
        this.friendRequests = data
      },
      (error: HttpErrorResponse) => alert(error.message))
  }

  getMessages() {
    this.messageService.getUnReadMessages(this.userName).subscribe(data => this.messages = data,
      (error: HttpErrorResponse) => alert(error.message))
  }

  getNotifications() {
    this.postService.getUserFriendsNotification(this.userName).subscribe(data => this.notifications = data,
      (error: HttpErrorResponse) => alert(error.message))
  }

  showimag() {
    this.showing.emit(this.activated)
  }

  Logout() {
    this.userService.Logout();
  }

  closeInputDropDown() {
    setTimeout(() => {
      this.dorpDownSearchInput = false;
    }, 1000);
  }

  addFriend(friendRequest: FriendRequest) {
    let friendName: string = friendRequest.from;
    let me: string = friendRequest.to;
    this.friendService.createFriend(new Friend(me, friendName)).subscribe(data => {
        this.toastr.success(friendName + ' added successfully');
        this.friendRequestService.deleteFriendRequest(friendName, me).subscribe(data => {
            let d = data
          },
          (error: HttpErrorResponse) => alert(error.message));
        this.dropDownOpened1 = false;
      },
      (error: HttpErrorResponse) => alert(error.message))


  }

  cancelFriendRequest(friendRequest: FriendRequest) {
    let friendName: string = friendRequest.from;
    let me: string = friendRequest.to;
    this.friendRequestService.deleteFriendRequest(friendName, me).subscribe(data => {
        this.toastr.success(friendName + ' request canceled');
        this.dropDownOpened1 = false;
      },
      (error: HttpErrorResponse) => alert(error.message))
  }
}

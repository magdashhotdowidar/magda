import {Component, DoCheck, OnInit} from '@angular/core';
import {Path} from "../../../shared/enums/path.enum";
import {ChattingUserService} from "../../chatting-user/chatting-user-infrastructure/chatting-user.service";
import {ChattingUser} from "../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {FriendRequest, FriendRequestService} from "../../infrastructure/services/friend-request.service";
import {Friend, FriendService} from "../../infrastructure/services/friends.service";
import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Post, PostService} from "../../infrastructure/services/posts.service";
import {PrivacyDTO, PrivacyService} from "../../../shared/services/my-privacy.service";
import {BlockUserService} from "../../infrastructure/services/block-user.service";

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {
//common friend it is very easy getAllUserFriends for userName and as well the same for the visitor and loop through userName friends if visitor friends contains
//  the friend. identify a array variable of type string and add the friend name then in the interpolation of common friends replace the 9 with the array length
// completely like the apple tree ex
  userName = localStorage.getItem(LocalStorage.userName);
  user: ChattingUser;
  path: typeof Path = Path;
  imgPath: string = this.path.userImagePath;
  friendImagePath: string = Path.userImagePath;
  postImagePath: string = Path.postImagePath;
  backgroundImagePath: string = Path.backgroundPath;
  personalEvent: Event = null;
  backgroundEvent: Event = null;
  selectedFile: File;
  showSave: boolean = false;
  visitor: boolean = false;
  showRemoveFriend: boolean = false;
  showRequestSent: boolean = false;
  showFriends: boolean = false;
  maximize: boolean = false;
  openPrivacy:boolean=false;
  openBlockUserSettingPoPup:boolean=false;
  friendsPrivacy:boolean=false;
  blocked:boolean=false;
  blockAllUsers:boolean=false;
  posts: Post[] = [];
  friends: ChattingUser[] = [];
  commonFriends: ChattingUser[] = [];


  constructor(private  userService: ChattingUserService,
              private friendRequestService: FriendRequestService,
              private friendService: FriendService,
              private blockedUserService: BlockUserService,
              private postService: PostService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private privacyService: PrivacyService,
              private title: Title,
              private router: Router) {
  }


  ngOnInit() {
    this.title.setTitle(this.route.snapshot.params['id'] + ' - personal Page')
    this.loadUser();
    this.setVisitor();
    this.getBlockAllUsersPrivacy();
    this.setShowRemoveFriend();
    this.loadUserPosts();
    this.getPrivacy();
  }


  setVisitor() {
    if (this.userName != this.router.url.split('/')[6].toString()) {
      this.visitor = true
    } else this.visitor = false
  }

  setShowRemoveFriend() {
    this.friendService.getAllUserFriends(this.userName).subscribe((data: ChattingUser[]) => {
        //console.log("data1:",data.length,data)
        for (let friend of data) {
          if (this.user.username == friend.username) this.showRemoveFriend = true;
        }
        ;
        /*     this.friendService.getAllUserFriends(this.user.username).subscribe((data: ChattingUser[]) => {
                 console.log("data2:",data.length,data)
                 for (let friend of data) {
                   if (this.user.username == friend.username) this.showRemoveFriend = true;
                 };

               },
               (error: HttpErrorResponse) => alert(error.message))*/
      },
      (error: HttpErrorResponse) => this.toastr.info('error in setShowRemoveFriend'))
  }

  loadUser() {
    this.userService.getUser(this.route.snapshot.params['id']).subscribe(data => {
        this.user = data;
        this.setShowRequestSent();
      },
      (error: HttpErrorResponse) => {
        console.log(this.user)
        this.toastr.info('in loadUser:' + error.message)
      })

  }

  loadUserPosts() {
    this.postService.getUserPosts(this.route.snapshot.params['id']).subscribe((data: Post[]) => this.posts = data,
      (error: HttpErrorResponse) => this.toastr.info('error in loadUserPosts'))
  }

  //fake method for testing
  getFriends() {
    this.friends = [];
    this.showFriends = !this.showFriends;
    for (let i = 0; i < 31; i++) {
      let user: ChattingUser = new ChattingUser();
      user.username = i + 'Ahmed Saber Amin El Barbari';
      user.personalImage = '1.jpg'
      this.friends.push(user);
    }
  }

  loadFriends() {
    this.showFriends = !this.showFriends;
    if (this.friends.length == 0)
      this.friendService.getAllUserFriends(this.route.snapshot.params['id']).subscribe((data: ChattingUser[]) => {
          this.friends = data;
          this.loadCommonFriends();
          // console.log(this.friends)
        },
        (error: HttpErrorResponse) => this.toastr.info('error in loadFriends'))
  }

  loadCommonFriends() {
    this.friendService.getCommonFriends(new Friend(this.userName, this.user.username)).subscribe((data) => {
      this.commonFriends = data;
      if (this.friendsPrivacy){
         this.friends=data;
      }
    }, (error: HttpErrorResponse) => this.toastr.info('error in getCommonFriends '));
  }


  updateUser() {
    const fd = new FormData();

    if (this.personalEvent != null || this.backgroundEvent != null) {
      if (this.personalEvent != null) {
        this.selectedFile = (<HTMLInputElement>this.personalEvent.target).files[0];
        (<HTMLInputElement>this.personalEvent.target).files = null
        this.user.personalImage = this.selectedFile.name;
      } else if (this.backgroundEvent != null) {
        this.selectedFile = (<HTMLInputElement>this.backgroundEvent.target).files[0];
        (<HTMLInputElement>this.backgroundEvent.target).files = null
        this.user.backgroundImage = this.selectedFile.name
      }

      fd.append('file', this.selectedFile, this.selectedFile.name);
      console.log('the selected image', this.selectedFile)
    }
    fd.append('updatedUser', JSON.stringify(this.user));
    this.userService.updateUser(fd).subscribe(data => {
        if (data) this.toastr.success('Data Saved Successfully'); else this.toastr.error('Error!!!!!!!!')
        this.showSave = false;
        this.selectedFile = null;
        //console.log(data)
      },
      (error: HttpErrorResponse) => this.toastr.info('error in updateUser'))

  }

  sendFriendReques() {
    this.friendRequestService.sendFriendRequest(new FriendRequest(this.userName, this.user.username)).subscribe((message: string) => {
      if (message.match('you sent already')) {
        this.toastr.warning('your request sent already');
      } else if (message.match('he sent already')) {
        this.toastr.warning(this.user.username + ' already sent to you');
      } else if (message.match('request sent successfully')) {
        this.showRequestSent = true;
        this.toastr.success('Your Request sent successfully');
      } else if (message.match('error')) this.toastr.success('Error!!!!');
    }, (error: HttpErrorResponse) => this.toastr.info('error in sendFriendReques'));

    //I will make the business logic of this method in the back to improve the performance and make it easier so i commented out this code.

    /*this.friendRequestService.getRequestByFromAndTo(this.userName, this.user.username).subscribe((data: FriendRequest[]) => {
        if (data.length==0) {
          this.friendRequestService.getRequestByFromAndTo(this.user.username, this.userName).subscribe((data: FriendRequest[]) => {
            if (data.length == 0) {
              this.friendRequestService.createFriendRequest(new FriendRequest(this.userName, this.user.username))
                .subscribe(data => {
                    this.showRequestSent = true;
                    this.toastr.success('Your Request sent successfully');

                  },
                  (error: HttpErrorResponse) => alert(error.message));
            } else this.toastr.warning(this.user.username + ' already sent to you');
          },(error: HttpErrorResponse) => alert(error.message))
        } else this.toastr.warning('your request sent already')
      },
      (error: HttpErrorResponse) => alert(error.message))*/

  }

  removeFriend() {
    this.friendService.deleteFriend(this.userName, this.user.username).subscribe(
      data => {
        this.toastr.success(this.user.username + ' Removed Successfully');
        this.showRemoveFriend = false
      },
      (error: HttpErrorResponse) => this.toastr.info('error in removeFriend'))
  }

  setShowRequestSent() {
    this.friendRequestService.getRequestByFromAndTo(this.userName, this.user.username).subscribe((data: FriendRequest[]) => {
        //  console.log('dddaaaaaa : ', data)
        if (data.length != 0) {
          this.showRequestSent = true;
        }
      },
      (error: HttpErrorResponse) => this.toastr.info('error in setShowRequestSent'))
  }

/*  createPrivacy() {
    this.privacyService.createPrivacy(new PrivacyDTO(this.userName,'friends', false)).subscribe(message => {
      if (message.match('success')) this.toastr.success('success registration')
      else if (message.match('fail')) this.toastr.error('error in createPrivacy')
    }, (error: HttpErrorResponse) => this.toastr.info('error in createPrivacy '));
  }*/
  updatePrivacy() {
    this.privacyService.updatePrivacy(new PrivacyDTO(this.userName,'friends', this.friendsPrivacy)).subscribe(message => {
      if (message.match('success')) this.toastr.success('success updating')
      else if (message.match('fail')) this.toastr.error('error in createPrivacy')
    }, (error: HttpErrorResponse) => this.toastr.info('error in updatePrivacy '));
  }
  getPrivacy(){
    this.privacyService.getPrivacyByUserAndProperty(this.route.snapshot.params['id'],'friends').subscribe(data=>{
      if(data) this.friendsPrivacy=data.propertyState
    }, (error: HttpErrorResponse) => this.toastr.info('error in getPrivacy '))
  }

  setBlocked() {
    this.blockedUserService.getAllBLockedUsers(this.route.snapshot.params['id']).subscribe(data => {
      for(let x of data)if(x.username.match(this.userName))this.blocked=true;
      if(this.blocked)this.toastr.success(this.route.snapshot.params['id']+' had blocked you');
      if(this.blockAllUsers)this.toastr.success(this.route.snapshot.params['id']+' had blocked every one');
    }, (error: HttpErrorResponse) => this.toastr.info('error in getAllBlockedUsers '))
  }
  getBlockAllUsersPrivacy() {
    this.privacyService.getPrivacyByUserAndProperty(this.route.snapshot.params['id'], 'blockAllUsers').subscribe(data => {
      if (data) this.blockAllUsers = data.propertyState
      this.setBlocked();
    }, (error: HttpErrorResponse) => this.toastr.info('error in getBlockAllUsersPrivacy '))
  }

}


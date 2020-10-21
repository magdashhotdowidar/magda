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
  personalEvent: Event = null;
  backgroundEvent: Event = null;
  selectedFile: File;
  showSave: boolean = false;
  visitor: boolean = false;
  showRemoveFriend: boolean = false;
  showRequestSent: boolean = false;
  posts:Post[]=[];

  constructor(private  userService: ChattingUserService,
              private friendRequestService: FriendRequestService,
              private friendService: FriendService,
              private postService:PostService,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private title:Title,
              private router: Router) {
  }


  ngOnInit() {
    this.title.setTitle(this.userName+ ' - personal Page')
    this.loadUser();
    this.setVisitor();
    this.setShowRemoveFriend();
    this.loadUserPosts();
  }


  setVisitor() {
    if (this.userName != this.router.url.split('/')[6].toString())
      this.visitor = true
    else this.visitor = false
  }

  setShowRemoveFriend() {
    this.friendService.getAllUserFriends(this.userName).subscribe((data: ChattingUser[]) => {
      console.log("data1:",data.length,data)
        for (let friend of data) {
          if (this.user.username == friend.username) this.showRemoveFriend = true;
        };
   /*     this.friendService.getAllUserFriends(this.user.username).subscribe((data: ChattingUser[]) => {
            console.log("data2:",data.length,data)
            for (let friend of data) {
              if (this.user.username == friend.username) this.showRemoveFriend = true;
            };

          },
          (error: HttpErrorResponse) => alert(error.message))*/
      },
      (error: HttpErrorResponse) => alert(error.message))
  }

  loadUser() {
    this.userService.getUser(this.route.snapshot.params['id']).subscribe(data => {
        this.user = data;
        this.user.roles = [];
        this.setShowRequestSent();
      },
      (error: HttpErrorResponse) => alert(error.message))

  }

  loadUserPosts(){
    this.postService.getUserPosts(this.userName).subscribe((data:Post[])=>this.posts=data,
      (error:HttpErrorResponse)=>alert(error.message))
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
        console.log(data)
      },
      (error: HttpErrorResponse) => alert(error.message))

  }

  sendFriendReques() {
    this.friendRequestService.getRequestByFromAndTo(this.userName, this.user.username).subscribe((data: FriendRequest[]) => {
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
      (error: HttpErrorResponse) => alert(error.message))

  }

  removeFriend() {
    this.friendService.deleteFriend(this.userName, this.user.username).subscribe(
      data => {
        this.toastr.success(this.user.username + ' Removed Successfully');
        this.showRemoveFriend = false
      },
      (error: HttpErrorResponse) => alert(error))
  }

  setShowRequestSent() {
    this.friendRequestService.getRequestByFromAndTo(this.userName, this.user.username).subscribe((data: FriendRequest[]) => {
      //  console.log('dddaaaaaa : ', data)
        if (data.length != 0) {
          this.showRequestSent = true;
        }
      },
      (error: HttpErrorResponse) => alert(error.message))
  }
}

import {Component, DoCheck, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Path} from "../../../../shared/enums/path.enum";
import {BlockUsersDTO, BlockUserService} from "../../../infrastructure/services/block-user.service";
import {PrivacyDTO, PrivacyService} from "../../../../shared/services/my-privacy.service";
import {LocalStorage} from "../../../../shared/enums/local-storage-coding.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ChattingUser} from "../../../chatting-user/chatting-user-infrastructure/chatting-user.model";
import {ChattingUserService} from "../../../chatting-user/chatting-user-infrastructure/chatting-user.service";

@Component({
  selector: 'block-user-setting',
  templateUrl: './block-user-setting.component.html',
  styleUrls: ['./block-user-setting.component.css']
})
export class BlockUserSettingComponent implements OnInit{
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  userName = localStorage.getItem(LocalStorage.userName);
  userImagePath: string = Path.userImagePath;
  blockedUsers: ChattingUser[] = [];
  usersForSearch:ChattingUser[]=[];
  blockedUser: string;
  blockAllUsers: boolean = false;
  private dorpDownSearchInput: boolean=false;

  constructor(private blockedUserService: BlockUserService,
              private privacyService: PrivacyService,
              private chattingUserService:ChattingUserService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getBlockAllUsersPrivacy();
    this.getAllBlockedUsers();
  }

  blockAll() {
    this.privacyService.updatePrivacy(new PrivacyDTO(this.userName, 'blockAllUsers', this.blockAllUsers)).subscribe(message => {
      if (message.match('success')) this.toastr.success('success updating')
    }, (error: HttpErrorResponse) => this.toastr.info('error in updatePrivacy '));
  }

  registerBlockedUser(value: string) {
    if (this.userName.match(value))this.toastr.success('you try to block your self');
    else {
      let contain: boolean = false;
      for (let user of this.blockedUsers) if (user.username.match(value)) contain = true;
      if (!contain && !this.userName.match(value)) {
        this.blockedUserService.createBlockedUser(new BlockUsersDTO(this.userName, value)).subscribe(message => {
          if (message.match('success')) this.toastr.success('success updating')
          this.getAllBlockedUsers();
        }, (error: HttpErrorResponse) => this.toastr.info('error in registerBlockedUser '));
      } else this.toastr.warning('you already blocked ' + value)
    }
  }

  getAllBlockedUsers() {
    this.blockedUserService.getAllBLockedUsers(this.userName).subscribe(data => {
      this.blockedUsers = data;
      this.closeInputDropDown();
    }, (error: HttpErrorResponse) => this.toastr.info('error in getAllBlockedUsers '))
  }

  deletePrivacy() {
    this.privacyService.deletePrivacy(this.userName, 'common').subscribe(message => {
      if (message.match('success')) this.toastr.success('success deletion')
    }, (error: HttpErrorResponse) => this.toastr.info('error in deletePrivacy '));
  }

  getBlockAllUsersPrivacy() {
    this.privacyService.getPrivacyByUserAndProperty(this.userName, 'blockAllUsers').subscribe(data => {
      if (data) this.blockAllUsers = data.propertyState
    }, (error: HttpErrorResponse) => this.toastr.info('error in getBlockAllUsersPrivacy '))
  }

  deleteBlockedUser(index: number) {
    this.blockedUserService.deleteBlockedUser(this.userName, this.blockedUsers[index].username).subscribe(data => {
      if (data.match('success')) this.toastr.success('success deletion')
      this.getAllBlockedUsers();
    }, (error: HttpErrorResponse) => this.toastr.info('error in deleteBlockedUser '))
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

  closeInputDropDown() {
    setTimeout(() => {
      this.dorpDownSearchInput = false;
    }, 1000);
  }


  close() {
    this.showpopup.emit(false);
  }


}


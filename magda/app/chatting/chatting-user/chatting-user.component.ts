import { Component, OnInit } from '@angular/core';
import {LocalStorage} from "../../shared/enums/local-storage-coding.enum";
import {Path} from "../../shared/enums/path.enum";
import {na} from "../../user/sign-in/sign-in.component";
import {Coding} from "../../shared/enums/coding.enum";

@Component({
  selector: 'chatting-user',
  templateUrl: './chatting-user.component.html',
  styleUrls: ['./chatting-user.component.css']
})
export class ChattingUserComponent implements OnInit {
role=localStorage.getItem(LocalStorage.role);
  ASaberWordAr:string=Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;
  userImagePath:string=Path.userImagePath;
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  backgroundImagePath: string = Path.backgroundPath;
signIn:boolean=true;
signUp:boolean=false;
  constructor() { }

  ngOnInit() {
    this.signin();
  }

  signin() {
    this.signUp=false;
    this.signIn=true;
  }

  signup() {
    this.signIn=false;
    this.signUp=true;
  }


}

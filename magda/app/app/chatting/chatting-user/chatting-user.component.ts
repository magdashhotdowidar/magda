import { Component, OnInit } from '@angular/core';
import {LocalStorage} from "../../shared/enums/local-storage-coding.enum";

@Component({
  selector: 'chatting-user',
  templateUrl: './chatting-user.component.html',
  styleUrls: ['./chatting-user.component.css']
})
export class ChattingUserComponent implements OnInit {
role=localStorage.getItem(LocalStorage.role);
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

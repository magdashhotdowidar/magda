import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chatting-user',
  templateUrl: './chatting-user.component.html',
  styleUrls: ['./chatting-user.component.css']
})
export class ChattingUserComponent implements OnInit {
role=localStorage.getItem('role');
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

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr'

import {HttpErrorResponse} from "@angular/common/http";
import {ChattingUser} from "../chatting-user-infrastructure/chatting-user.model";
import {ChattingUserService} from "../chatting-user-infrastructure/chatting-user.service";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Local} from "protractor/built/driverProviders";

@Component({
  selector: 'chatting-sign-up',
  templateUrl: './chatting-sign-up.component.html',
  styleUrls: ['./chatting-sign-up.component.css']
})
export class ChattingSignUpComponent implements OnInit {
  user: ChattingUser = new ChattingUser();

  role: string = localStorage.getItem(LocalStorage.role);
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: ChattingUserService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.userService.getUser(localStorage.getItem(LocalStorage.userName)).subscribe(data => {
      this.user = data;
      console.log('the user form DB', this.user)
    })
    // this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      roles: [],
      enabled: true
    }
  }

  OnSubmit(form: NgForm) {
    if (!this.user.roles.includes(form.value.role))
      this.user.roles = [form.value.role]
    else this.user.roles = [];
    this.user.gender = form.value.gender;
    this.user.backgroundImage = '';
    this.user.personalImage = '';
    console.log('this.user', this.user)

    const fd = new FormData();
    fd.append('updatedUser', JSON.stringify(this.user));
    this.userService.updateUser(fd)
      .subscribe((data: ChattingUser) => {
          console.log('updated user', data)
          if (data) {
            this.resetForm(form);
            this.toastr.success('User registration successful');
          } else

            this.toastr.error('ERROR!!!');
        },
        (err: HttpErrorResponse) => {
          console.log("THE ERROR PART :", err.message)
          alert(err.message);
        });
  }


}

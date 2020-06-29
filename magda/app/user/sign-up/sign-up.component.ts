import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { User } from '../user-infrastructure/user.model';
import { UserService } from '../user-infrastructure/user.service';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  message :any;
  showmessage:boolean=false;
  role:string=localStorage.getItem('role');
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      username: '',
      password: '',
     roles:[],
      enabled:true
    }
  }

  OnSubmit(form: NgForm) {
this.user.roles=[form.value.role]
    this.userService.registerUser(this.user)
      .subscribe((data: any) => {
          this.showmessage=true;
        setTimeout(()=>{this.showmessage=false},1500)

        if (data.Succeeded == true) {
          this.message= data.Succeeded;
          this.resetForm(form);
          this.toastr.success('User registration successful');
        }
        else
          if (data.Errors!=null)
          this.toastr.error(data.Errors[0]);
      },
        (err: HttpErrorResponse)=>{console.log("THE ERROR PART :",err.error)
         alert(err.message);});
  }


}

import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import {User} from '../user-infrastructure/user.model';
import {UserService} from '../user-infrastructure/user.service';
import {HttpErrorResponse} from "@angular/common/http";
import {LocalStorage} from "../../shared/enums/local-storage-coding.enum";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User;
  allAdmins: string[] = []
  message: any;
  l: typeof LocalStorage = LocalStorage;
  role: string = localStorage.getItem(LocalStorage.role);
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr: ToastrService) {
  }

  ngOnInit() {//don't ever never set any field to null or undefined at least set it to '' and if it is an array set it to []
   this.user=this.userService.getUserFromLS();
   if (this.user==null)this.user=new User();
    this.getAllAdmins();
   // this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) form.reset();
    this.user = {
      username: '',
      password: '',
      selectedRole:'',
      roles: [],
      enabled: true
    }
  }

  OnSubmit(form: NgForm) {

    this.userService.registerUser(this.user)
      .subscribe((data: any) => {
          if (data.Succeeded == true) {
            this.message = data.Succeeded;
            this.resetForm(form);
            this.toastr.success('User registration successful');
          } else if (data.Errors != null)
            this.toastr.error(data.Errors[0]);
        },
        (err: HttpErrorResponse) => {
          alert(err.error.message);
        });
  }

  onAddRole() {
    //this.user.roles.push(form.value.role);
    if (this.user.roles == undefined || !this.user['roles']) this.user.roles = []
    if (!this.user.roles.includes(this.user.selectedRole)) this.user.roles.push(this.user.selectedRole);
  }

  onDelete(index: number) {
    this.user.roles.splice(index, 1);
  }

  getAllAdmins() {
    this.userService.getAllAdmins().subscribe((data: string[]) => this.allAdmins = data,
      (err: HttpErrorResponse) => {
        console.log("THE ERROR PART :", err.message)
      });
  }
}

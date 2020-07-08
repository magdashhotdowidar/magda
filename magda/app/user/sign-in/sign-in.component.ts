import {Component, OnInit} from '@angular/core';
import {AuthenticationResponse, UserService} from '../user-infrastructure/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Request} from '../user-infrastructure/user.service';
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {User} from "../user-infrastructure/user.model";
import {Coding} from "../../shared/enums/coding.enum";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  OnSubmit(f: NgForm, userName, password) {
    this.userService.userAuthentication(new Request(userName, password)).subscribe((data:AuthenticationResponse) => {
        const tokenappendbearer: string = 'Bearer ' + data.jwttoken;

        localStorage.setItem('adminLogin', data.theUserAdmin)
        localStorage.setItem('userToken', tokenappendbearer);
        localStorage.setItem('userName', data.jwtUserName);
        localStorage.setItem('role', data.role);

        this.router.navigate([Coding.siteName + localStorage.getItem('adminLogin')]);
      },
      (err: HttpErrorResponse) => {
        f.reset();
        alert(err.message);
      });
  }

}

export var na: string = Coding.siteName + localStorage.getItem('adminLogin');

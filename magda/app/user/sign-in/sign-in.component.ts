import {Component, OnInit} from '@angular/core';
import {AuthenticationResponse, UserService} from '../user-infrastructure/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {Request} from '../user-infrastructure/user.service';
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {User} from "../user-infrastructure/user.model";
import {Coding} from "../../shared/enums/coding.enum";
import {LocalStorage} from "../../shared/enums/local-storage-coding.enum";
import {EncodingLocalStorageService} from "../../shared/services/encoding-local-storage.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  showPassword: string = 'password';
  l: typeof LocalStorage = LocalStorage;

  constructor(private userService: UserService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  OnSubmit(f: NgForm, userName, password) {
    this.userService.userAuthentication(new Request(userName, password)).subscribe((data: AuthenticationResponse) => {
        const tokenappendbearer: string = 'Bearer ' + data.jwttoken;

        localStorage.setItem(this.l.admin, data.theUserAdmin)
        localStorage.setItem(this.l.token, tokenappendbearer);
        localStorage.setItem(this.l.userName, data.jwtUserName);
        localStorage.setItem(this.l.userImage,data.userImage);
        localStorage.setItem(this.l.role, data.role);
        if (data.visitsCount == null || data.visitsCount == 0) data.visitsCount = 1;else data.visitsCount++;
        this.toastr.info('VISIT NO ->' + data.visitsCount);
        this.updateUserVisitsCount(data.jwtUserName, data.visitsCount);
      },
      (err: HttpErrorResponse) => {
        f.reset();
        alert(err.message);
      });
  }

  updateUserVisitsCount(user: string, count: number) {
    this.userService.setUserVisitsCount(user,count ).subscribe((data:string)=>
        this.router.navigate([Coding.siteName + localStorage.getItem(LocalStorage.admin)]),
      (error:HttpErrorResponse)=>this.toastr.error(error.message));
  }

}

export var na: string = Coding.siteName + localStorage.getItem(LocalStorage.admin);

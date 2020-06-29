import {Component, OnInit} from '@angular/core';
import {UserService} from '../user-infrastructure/user.service';
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
    //const requset:Request=new Request(userName,password);
    this.userService.userAuthentication(new Request(userName, password)).subscribe((data: any) => {
        const tokenappendbearer: string = 'Bearer ' + data.token;
        localStorage.setItem('userToken', tokenappendbearer);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('role', data.role);
        //console.log(localStorage.getItem('userName'), ' &&&&& ', localStorage.getItem('role'));
     localStorage.setItem('adminLogin',localStorage.getItem('userName'))

        if (data.role == 'ROLE_ADMIN')this.router.navigate([Coding.siteName + localStorage.getItem('adminLogin')])
        else {
          let adminForUri: string = '';
          if (data.role != 'ROLE_ADMIN') {
            let allUser: User[] = []
            this.userService.getAllUsers().subscribe((data2: User[]) => {
              allUser = data2
              for (let user of allUser) {
                if (user.roles[0] == 'ROLE_ADMIN') {
                  adminForUri = user.username;
                }
              }
              localStorage.setItem('adminLogin',adminForUri)
              this.router.navigate([Coding.siteName + localStorage.getItem('adminLogin')]);

            });
          }
        }

      },
      (err: HttpErrorResponse) => {
        f.reset();
        alert(err.message);
      });
  }

}

export var na:string = Coding.siteName+localStorage.getItem('adminLogin');

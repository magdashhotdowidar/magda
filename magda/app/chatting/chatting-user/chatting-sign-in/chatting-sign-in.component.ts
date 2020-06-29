import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {ChattingUserService, Request} from "../chatting-user-infrastructure/chatting-user.service";


@Component({
  selector: 'chatting-sign-in',
  templateUrl: './chatting-sign-in.component.html',
  styleUrls: ['./chatting-sign-in.component.css'],
})
export class ChattingSignInComponent implements OnInit {

  constructor(private userService: ChattingUserService,
              private router: Router,
              private route:ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit() {
  }

  OnSubmit(f: NgForm, userName, password) {

    this.router.navigate(['../chattinghome'],{relativeTo:this.route});

  }

}

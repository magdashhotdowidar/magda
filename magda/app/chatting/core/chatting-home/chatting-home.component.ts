import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'chatting-home',
  templateUrl: './chatting-home.component.html',
  styleUrls: ['./chatting-home.component.css']
})
export class ChattingHomeComponent implements OnInit, AfterViewChecked {

  direc: boolean = false;
  title = 'THE SELL DEPARTMENT ';
  showimg: boolean;


  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.url.split('/').length == 5) {
      this.showimg = true;
    } else if (this.router.url.split('/').length >= 6) this.showimg = false;

  }

  ngAfterViewChecked() {
    if (this.router.url.split('/').length >= 6) this.showimg = false;
  }

  setimag(activated: boolean) {
    this.showimg = activated;
  }


}

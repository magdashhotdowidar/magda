import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Coding} from "../shared/enums/coding.enum";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
role=localStorage.getItem('role');
  constructor(private title:Title) { }

  ngOnInit() {
    this.title.setTitle(Coding.siteName_title+' - login')
  }

}

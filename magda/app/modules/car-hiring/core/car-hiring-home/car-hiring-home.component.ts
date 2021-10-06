import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Coding} from "../../../shared/enums/coding.enum";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'tutorial-home',
  templateUrl: './car-hiring-home.component.html',
  styleUrls: ['./car-hiring-home.component.css']
})
export class CarHiringHomeComponent implements OnInit ,AfterContentChecked{
  direc: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
  }
}

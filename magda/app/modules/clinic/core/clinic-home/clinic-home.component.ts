import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Coding} from "../../../shared/enums/coding.enum";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'clinic-home',
  templateUrl: './clinic-home.component.html',
  styleUrls: ['./clinic-home.component.css']
})
export class ClinicHomeComponent implements OnInit{
  direc: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
  }
}

import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Coding} from "../../../shared/enums/coding.enum";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'tutorial-home',
  templateUrl: './tutorial-home.component.html',
  styleUrls: ['./tutorial-home.component.css']
})
export class TutorialHomeComponent implements OnInit ,AfterContentChecked{
  videoUrl: string = this.router.url.split('/')[4];
  hiddenTabs: boolean = false;
  direc: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  ngAfterContentChecked(): void {
    this.videoUrl=this.router.url.split('/')[4];
    if( this.videoUrl =='video')this.hiddenTabs=true;
    else this.hiddenTabs=false;
  }
}

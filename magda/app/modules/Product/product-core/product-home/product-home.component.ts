import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
import {ProductJasperReportService} from "../../infrastructure/services/product-jasper-report.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Coding} from "../../../shared/enums/coding.enum";
import {animate, group, query, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.css'],
  animations:[
    trigger('router',[
      transition('*<=>*',[
        group([
          query(':enter',[
            style({
              transform:'translateX(100%)'
            }),
            animate(700,style({
              transform:'translateX(0)'
            }))
          ]),
          query(':leave',[
            style({
              transform:'translateX(0)'
            }),
            animate(700,style({
              transform:'translateX(-100%)'
            }))
          ])
        ])
      ])
    ])
    ]
})
export class ProductHomeComponent implements OnInit,AfterViewChecked {
  direc: boolean = false;
  title = 'THE SELL DEPARTMENT ';
  showimg: boolean;
  disabledForCart: string = this.router.url.split('/')[3];


  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.router.url.split('/').length == 4) {
      this.showimg = true;
    } else if (this.router.url.split('/').length >= 5) this.showimg = false;
    else if (this.router.url.split('/')[3] == Coding.product && this.disabledForCart == null) this.showimg = true;
    else if (this.disabledForCart != '') this.showimg = false;
  }
  ngAfterViewChecked(){
    if (this.router.url.split('/').length >= 5) this.showimg = false;
  }

  setimag(activated: boolean) {
    this.showimg = activated;
  }


}

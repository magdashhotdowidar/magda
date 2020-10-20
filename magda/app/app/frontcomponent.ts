import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class Frontcomponent {
  title = 'app';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('en');
    translate.use('en');
  }




}

import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Coding} from "../shared/enums/coding.enum";
import {na} from "./sign-in/sign-in.component";
import {Path} from "../shared/enums/path.enum";
import {TranslateService} from "@ngx-translate/core";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  path: typeof Path = Path;
  role = localStorage.getItem('role');
  productPath: string = '../' + na + '/p';
  imgPath: string = this.path.backgroundPath;
  backgrounds: string[] = ['1.jpg', '2.jpg', '3.jfif', '4.jfif', '5.jfif', '6.jfif'];
  selectedLang: string = 'en'
  langs: string[] = ['en', 'ar']
  direc: boolean = false;

  constructor(@Inject(DOCUMENT) private document,
              private title: Title,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.setLang();
    this.title.setTitle(Coding.siteName_title + ' - login')
  }

  setLang() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    //  const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.selectedLang.match(/en|ar/) ? this.selectedLang : "en");
    if (this.selectedLang == 'ar') this.direc = true;
    else this.direc = false;
  }
/*  toggleLanguage() {
    this.selectedLang = (this.selectedLang == 'ar') ? 'en' : 'ar';

    this.document.getElementById('lang-style').setAttribute('href', this.selectedLang + '.bundle.css');
   // this.localStorageService.setLanguage(this.CURRENT_LANG);

    this.translate.use(this.selectedLang);
   // this.langService.lang.next(this.CURRENT_LANG);
  }*/
}

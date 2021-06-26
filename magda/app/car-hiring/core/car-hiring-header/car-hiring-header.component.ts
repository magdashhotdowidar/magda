import {AfterContentChecked, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../user/user-infrastructure/user.service";
import {Coding} from "../../../shared/enums/coding.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {na} from "../../../user/sign-in/sign-in.component";
import {Path} from "../../../shared/enums/path.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";


@Component({
  selector: 'car-hiring-header',
  templateUrl: './car-hiring-header.component.html',
  styleUrls: ['./car-hiring-header.component.css']
})
export class CarHiringHeaderComponent implements OnInit,AfterContentChecked {

  @Output() right_direction = new EventEmitter<boolean>();
  @ViewChild('input', {static: false}) input: ElementRef;
  selectedLang: string = 'ar'
  userName: string = localStorage.getItem(LocalStorage.userName);
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  userImagePath: string = Path.userImagePath;
  ASaberWordAr: string = Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;
  role: string = localStorage.getItem(LocalStorage.role);
  l: typeof LocalStorage = LocalStorage;
  roleAdmin: string = this.l.ROLE_ADMIN;
  dropDownOpened: boolean = false;


  constructor(private userService: UserService,
              private toastr:ToastrService,
              private translate: TranslateService,

              private router:Router
  ) {}

  ngOnInit() {
    this.setLang();
  }

  setLang() {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');
    this.translate.use(this.selectedLang.match(/en|ar/) ? this.selectedLang : "ar");
    if (this.selectedLang == 'ar') {
      this.right_direction.emit(true);
      localStorage.setItem('direction', 'rtl');
    } else {
      this.right_direction.emit(false);
      localStorage.setItem('direction', 'ltr');
    }
  }

  ngAfterContentChecked(): void {
  }

  Logout() {
    this.userService.Logout();
  }

}

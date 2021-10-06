import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {CartService} from "../../infrastructure/services/cart.service";
import {Cart} from "../../infrastructure/models/Cart";
import {UserService} from "../../../user/user-infrastructure/user.service";
import {Coding} from "../../../shared/enums/coding.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {na} from "../../../user/sign-in/sign-in.component";



@Component({
  selector: 'product-header',
  templateUrl: './product-header.component.html',
  styleUrls: ['./product-header.component.css']
})
export class ProductHeaderComponent implements OnInit {
  @Output() showing = new EventEmitter<boolean>();
  @Output() right_direction = new EventEmitter<boolean>();
  l:typeof LocalStorage=LocalStorage;
  selectedLang:string='ar'
  userName:string=localStorage.getItem(LocalStorage.userName);
  mainPath:string='/'+na+'/'+Coding.front_home;
  role:string=localStorage.getItem(LocalStorage.role);
  activated: boolean = false;
  dropDownOpened:boolean=false;
  total:number=0;
  cartLineCount:number=0;

  constructor(private router: Router,
              private translate: TranslateService,
              private cartService:CartService,
              private userService:UserService) {
  }

  ngOnInit() {
    this.setLang();
    this.setTotal();
  }

  setLang(){
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');
  //  const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.selectedLang.match(/en|ar/) ?this.selectedLang : "ar");
    if (this.selectedLang=='ar')this.right_direction.emit(true);
    else this.right_direction.emit(false);
  }

  setTotal(){
    this.cartService.getCartLineByUser(this.userName).subscribe((data:Cart[])=>{
      this.total=data.reduce(function (prev, cur) {
        let t: any = cur.amount * cur.price;
        return prev + t;
      }, 0);
      this.cartLineCount=data.length;
    })
  }


  showimag() {
    this.showing.emit(this.activated)
  }

  Logout() {
this.userService.Logout();
  }


}

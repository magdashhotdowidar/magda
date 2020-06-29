import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../user/user-infrastructure/user.service";
import {Coding} from "../../shared/enums/coding.enum";

@Component({
  selector: 'front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css']
})
export class FrontHeaderComponent implements OnInit {

  @Output() showing = new EventEmitter<boolean>();
  @Output() right_direction = new EventEmitter<boolean>();
  selectedLang:string='en'
  userName:string=localStorage.getItem("userName");
  total:number=0;
  dropDownOpened:boolean=false;


  constructor(private router: Router,
              private route:ActivatedRoute,
              private translate: TranslateService,
              private userService:UserService
              ) {
  }

  ngOnInit() {
    this.setLang();
  }

  setLang(){
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('ar');
    //  const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.selectedLang.match(/en|ar/) ?this.selectedLang : "ar");
    if (this.selectedLang=='ar')this.right_direction.emit(true);
    else this.right_direction.emit(false);
  }

  private login(authLicense: string) {

    switch (authLicense) {
      case 'product':
        /*this.router.navigateByUrl('product');*/
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.product],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.product],{relativeTo:this.route})
      }
        break;
      case 'chatting':
        /*  this.router.navigateByUrl('chatting');*/
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.chatting],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.chatting],{relativeTo:this.route})
      }
        break;
      default:
        break;
    }
  }

  Logout() {
this.userService.Logout();
  }


}

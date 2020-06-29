import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../../user/user-infrastructure/user.service';
import {Coding} from "../../shared/enums/coding.enum";

@Component({
  selector: 'app-home',
  templateUrl: './front-home.component.html',
  styleUrls: ['./front-home.component.css']
})
export class FrontHomeComponent implements OnInit,OnDestroy {
  userClaims: any;
  title = 'WEL COME TO OUR SITE ';
  direc:boolean=false;

  constructor(private router: Router,
              private route:ActivatedRoute) { }

  ngOnInit() {

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

  ngOnDestroy(): void {
   // this.userService.removeLocalStorageItems();
  }

}

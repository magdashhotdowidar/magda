import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Coding} from "../../shared/enums/coding.enum";
import {Title} from "@angular/platform-browser";
import {Path} from "../../shared/enums/path.enum";

@Component({
  selector: 'app-home',
  templateUrl: './front-home.component.html',
  styleUrls: ['./front-home.component.css']
})
export class FrontHomeComponent implements OnInit,OnDestroy {
  userClaims: any;
  title = 'WEL COME TO OUR SITE ';
  direc:boolean=false;
  path: typeof Path = Path;
  preloadImgPath:string=this.path.preloaderPath;
  imgPath: string = this.path.backgroundPath;
  backgrounds: string[] = ['1.jpg', '2.jpg', '3.jfif', '4.jfif', '5.jfif', '6.jfif'];

  constructor(private router: Router,
              private route:ActivatedRoute,
              private Title:Title) { }

  ngOnInit() {
    this.Title.setTitle(Coding.siteName_title+' - mainPage')
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
      case 'tutorial':
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.tutorial],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.tutorial],{relativeTo:this.route})
      }
        break;
      case 'carHiring':
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.car_hiring],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.car_hiring],{relativeTo:this.route})
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

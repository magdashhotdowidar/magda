import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../user/user-infrastructure/user.service";
import {Coding} from "../../shared/enums/coding.enum";
import {LocalStorage} from "../../shared/enums/local-storage-coding.enum";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'front-header',
  templateUrl: './front-header.component.html',
  styleUrls: ['./front-header.component.css'],
  animations:[
    trigger('come1',[
      transition('void<=>*',[
        style({
          opacity:0,
          transform:'translateX(-1100px) translateY(0px)'
        }),
        animate(500,style({
          opacity:1,
          transform:'translateX(0)translateY(0)'
        }))
      ])
    ]),
    trigger('come2',[
      transition('void<=>*',[
        style({
          opacity:0,
          transform:'translateX(-1100px) translateY(0px)'
        }),
        animate(800,style({
          opacity:1,
          transform:'translateX(0)translateY(0)'
        }))
      ])
    ]),
    trigger('come3',[
      transition('void<=>*',[
        style({
          opacity:0,
          transform:'translateX(-1100px) translateY(0px)'
        }),
        animate(1000,style({
          opacity:1,
          transform:'translateX(0)translateY(0)'
        }))
      ])
    ]),
    trigger('come4',[
      transition('void<=>*',[
        style({
          opacity:0,
          transform:'translateX(-1100px) translateY(0px)'
        }),
        animate(1100,style({
          opacity:1,
          transform:'translateX(0)translateY(0)'
        }))
      ])
    ]),
    trigger('come5',[
      transition('void<=>*',[
        style({
          opacity:0,
          transform:'translateX(-1100px) translateY(0px)'
        }),
        animate(1400,style({
          opacity:1,
          transform:'translateX(0)translateY(0)'
        }))
      ])
    ]),
    trigger('come6',[
      transition('void<=>*',[
        style({
          opacity:0,
          transform:'translateX(-1100px) translateY(0px)'
        }),
        animate(1600,style({
          opacity:1,
          transform:'translateX(0)translateY(0)'
        }))
      ])
    ]),
   /* trigger('click1',[
      state('s1',
        style({
          transform:'translateY(0px)'
        })
      ),
      state('s2',
        style({
          transform:'translateY(30px)'
        })
      ),
      transition('s1<=>s2', animate(100))
    ]),*/
    trigger('click2',[
      state('s1',
        style({
          transform:'translateY(0px)'
        })
      ),
      transition('s1<=>*',[
        style({
          transform:'translateY(0px)'
        }),
        animate(200,keyframes([
          style({transform:'translateY(30px)',offset:.5}),
          style({transform:'translateY(0px)',offset:1}),
        ]))
      ])
    ])
]
})
export class FrontHeaderComponent implements OnInit {

  @Output() showing = new EventEmitter<boolean>();
  @Output() right_direction = new EventEmitter<boolean>();
  selectedLang:string='ar'
  userName:string=localStorage.getItem(LocalStorage.userName);
  total:number=0;
  dropDownOpened:boolean=false;
  state:string='s1';


  constructor(private router: Router,
              private route:ActivatedRoute,
              private translate: TranslateService,
              private userService:UserService
              ) {
  }

  ngOnInit() {
    this.setLang();
  }
  onclick(){
    this.state=this.state=='s1'?this.state='s2':this.state='s1';
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
      case 'cars':
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.car_hiring],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.car_hiring],{relativeTo:this.route})
      }
        break;
      case 'pyramid':
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.pyramid],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.pyramid],{relativeTo:this.route})
      }
        break;
      case 'tutorial':
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.tutorial],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.tutorial],{relativeTo:this.route})
      }
        break;
      case 'test_chat':
      {
        if(this.router.url.split('/').length==3)
          this.router.navigate([Coding.test_chat],{relativeTo:this.route})
        else this.router.navigate(['../'+Coding.test_chat],{relativeTo:this.route})
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

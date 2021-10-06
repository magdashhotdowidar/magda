import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from "../../user/user-infrastructure/user.service";
import {LocalStorage} from "../enums/local-storage-coding.enum";

@Directive({
  selector: '[authorizeView]'
})
export class AuthorizeViewDirective implements OnInit {
  authViews: string [];

  constructor(private templateRef: TemplateRef<any>,
              private userService: UserService,
              private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {

  }

  @Input()
  set authorizeView(viewList: LocalStorage[]) {
    if (viewList != undefined && viewList != null && viewList.length != 0) {
      this.authViews = this.userService.getUserFromLS().roles;
      let found = false;

      for(let i=0; i< viewList.length; i++) {
        if (this.authViews.includes(viewList[i])) {
          found = true;
          break;
        }
         else
          this.viewContainerRef.clear();
      }
      if (found)
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      else
        this.viewContainerRef.clear();
    }
  }
}

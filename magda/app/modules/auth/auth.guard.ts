import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorage} from "../shared/enums/local-storage-coding.enum";

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if (localStorage.getItem(LocalStorage.token) != null)
      return true;
      this.router.navigate(['/login']);
      return false;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute,state);
  }

}

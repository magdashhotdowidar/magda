import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LocalStorage} from "../shared/enums/local-storage-coding.enum";

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    let role:string=localStorage.getItem(LocalStorage.role);
    let routeRoleData:string[]=next.data[LocalStorage.role]
      for(let r of routeRoleData){
        if (role==r)return true
      }
      this.router.navigate(['/login']);
      return false;
  }
}

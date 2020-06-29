import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    let role:string=localStorage.getItem('role');
    let routeRoleData:string[]=next.data['role']
      for(let r of routeRoleData){
        if (role==r)return true
      }
      this.router.navigate(['/login']);
      return false;
  }
}

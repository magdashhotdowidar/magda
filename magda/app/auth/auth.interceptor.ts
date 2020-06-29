import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../user/user-infrastructure/user.service";
import {tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        if (localStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
               setHeaders:{Authorization:localStorage.getItem('userToken')}
            });
            /*,
                 'Content-Type':' application/json','Access-Control-Allow-Origin':'*',
                 'Access-Control-Allow-Headers':'X-Requested-With,content-type',
                 'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                 'Access-Control-Allow-Credentials':'true'*/
            return next.handle(clonedreq)
                .pipe(tap(
                succ => {
                },
                err => {
                    if (err.status === 401)
                        this.router.navigateByUrl('/login');
                }
                ));
        }
        else {
            this.router.navigateByUrl('/login');
        }
    }
}

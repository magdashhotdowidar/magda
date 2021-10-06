import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap, take, tap} from "rxjs/operators";

import {of} from "rxjs";
import {CartService} from "../../services/cart.service";
import {ProductService} from "../../services/product.service";
import * as fromProductActions from "../product-actions/product.action";
import {Cart} from "../../models/Cart";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {na} from "../../../../user/sign-in/sign-in.component";


@Injectable()
export class ProductEffect {
  constructor(private cartService: CartService, private actions: Actions,) {
  }

  @Effect()
  addCartLine$ = this.actions.pipe(
    ofType(fromProductActions.ADD_CART),
    switchMap((action: fromProductActions.AddCart) => {
      return this.cartService.getCartLineByUser(action.payload).pipe(map((data: Cart[]) => {
        return new fromProductActions.SetCart(data);
      }))
    })
  )


}

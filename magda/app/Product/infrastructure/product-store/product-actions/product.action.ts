import {Action} from "@ngrx/store";
import {Cart} from "../../models/Cart";
import {Product} from "../../models/product";


export const ADD_CART = 'addCart';
export const UPDATE_CART = 'updateCart';
export const SET_CART = 'setCart'

export class ErrorAlert {
  constructor(message: string) {
    alert(message)
  }
}

export class AddCart implements Action {
  readonly type = ADD_CART;

  constructor(public payload: string) {
  }
}

export class UpdateCart implements Action {
  readonly type = UPDATE_CART;

  constructor(public payload: { cart: Cart, product: Product }) {
  }
}

export class SetCart implements Action {
  readonly type = SET_CART;

  constructor(public payload: Cart[]) {
  }
}

export type ProductAction = AddCart | UpdateCart | SetCart;


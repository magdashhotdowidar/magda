import {Cart} from "../../models/Cart";
import * as fromProducts from "../product-actions/product.action";


export interface CartInterface {
  carts: Cart[];
}

const initialData: Cart[] =[]


export function productReducer(state = initialData, action: fromProducts.ProductAction) {
  switch (action.type) {
    case fromProducts.SET_CART: {
      state = action.payload;
      return state;
    };

    default :
      return state;
  }
}

import {ActionReducerMap} from "@ngrx/store";

import * as fromProductReducer from "./product-reducers/product.reducer";
import {Cart} from "../models/Cart";


export interface ProductStoreStates {
  carts: Cart[];
}

export const Reducers: ActionReducerMap<ProductStoreStates> = {
  carts: fromProductReducer.productReducer
}

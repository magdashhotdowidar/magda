import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateProductComponent} from "./components/create-product/create-product.component";
import {ProductHomeComponent} from "./product-core/product-home/product-home.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {ImageSliderComponent} from "./components/image-slider/image-slider.component";
import {CartComponent} from "./components/cart/cart.component";
import {AuthGuard} from "../auth/auth.guard";
import {AuthorizeGuard} from "../auth/authorize.guard";
import {LocalStorage} from "../shared/enums/local-storage-coding.enum";


//path: '',pathMatch:'full',redirectTo :'slider'
const routes: Routes = [
  {
    path: '', component: ProductHomeComponent, children: [
      {path: 'slider', component: ImageSliderComponent,data:{index: 0}},
      {
        path: 'sell', component: CreateProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        canDeactivate: [CanDeactivateGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_SELLER],index:1}
      },
      {
        path: 'cart', component: CartComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_USER],index: 3}
      },
      {
        path: 'add', component: AddProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN],index: 2}
      },
      {
        path: 'p_update/:name', component: UpdateProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN],index: 4}
      },
      {
        path: 'p_details/:name', component: ProductDetailsComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_USER],index: 5}
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}

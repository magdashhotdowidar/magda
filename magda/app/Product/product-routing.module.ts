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
      {path: 'slider', component: ImageSliderComponent},
      {
        path: 'sell', component: CreateProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_SELLER]},
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'cart', component: CartComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_USER]}
      },
      {
        path: 'add', component: AddProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN]}
      },
      {
        path: 'p_update/:name', component: UpdateProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN]}
      },
      {
        path: 'p_details/:name', component: ProductDetailsComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_USER]}
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

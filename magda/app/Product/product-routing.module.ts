import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateProductComponent} from "./create-product/create-product.component";
import {ProductHomeComponent} from "./product-core/product-home/product-home.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {ImageSliderComponent} from "./image-slider/image-slider.component";
import {CartComponent} from "./cart/cart.component";
import {AuthGuard} from "../auth/auth.guard";
import {AuthorizeGuard} from "../auth/authorize.guard";


//path: '',pathMatch:'full',redirectTo :'slider'
const routes: Routes = [
  {
    path: '', component: ProductHomeComponent, children: [
      {path: 'slider', component: ImageSliderComponent},
      {
        path: 'sell', component: CreateProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {role: ['ROLE_ADMIN', 'ROLE_USER']},
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'cart', component: CartComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {role: ['ROLE_ADMIN', 'ROLE_USER']}
      },
      {
        path: 'add', component: AddProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {role: ['ROLE_ADMIN']}
      },
      {
        path: 'p_update/:name', component: UpdateProductComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {role: ['ROLE_ADMIN']}
      },
      {
        path: 'p_details/:name', component: ProductDetailsComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {role: ['ROLE_ADMIN', 'ROLE_USER']}
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

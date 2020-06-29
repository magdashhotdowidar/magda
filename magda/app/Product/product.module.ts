import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductHeaderComponent } from './product-core/product-header/product-header.component';
import {CommonModule} from "@angular/common";
import {ProductHomeComponent} from "./product-core/product-home/product-home.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import { SearchPopupComponent } from './search-popup/search-popup.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import { InvoiceFilterPipe } from './infrastructure/filters/invoice-filter.pipe';
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {ProductFilterPipe} from "./infrastructure/filters/product-filter.pipe";
import {NgbCarouselModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { AddProductPopupComponent } from './add-product/add-product-popup/add-product-popup.component';
import { AddCategoryPopupComponent } from './add-product/add-product-popup/add-category-popup/add-category-popup.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CartComponent } from './cart/cart.component';
import {PositiveOnlyDirective} from "./infrastructure/directives/positive-only.directive";
import {OnlyNumber} from "./infrastructure/directives/OnlyNumber";
import {AuthGuard} from "../auth/auth.guard";
import {AuthorizeGuard} from "../auth/authorize.guard";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    ProductComponent,
    CreateProductComponent,
    ProductDetailsComponent,
    AddProductComponent,
    ProductHeaderComponent,
    UpdateProductComponent,
    ProductHomeComponent,
    SearchPopupComponent,
    InvoiceFilterPipe,
    ProductFilterPipe,
    ImageSliderComponent,
    ProductItemComponent,
    AddProductPopupComponent,
    AddCategoryPopupComponent,
    CartComponent,
    PositiveOnlyDirective,
    OnlyNumber
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgbModule,
    NgbCarouselModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  providers: [ CanDeactivateGuard,AuthGuard,AuthorizeGuard]

})
export class ProductModule { }

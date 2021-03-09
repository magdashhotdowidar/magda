import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductHeaderComponent } from './product-core/product-header/product-header.component';
import {CommonModule} from "@angular/common";
import {ProductHomeComponent} from "./product-core/product-home/product-home.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import { SearchPopupComponent } from './components/search-popup/search-popup.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import { InvoiceFilterPipe } from './infrastructure/filters/invoice-filter.pipe';
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {ProductFilterPipe} from "./infrastructure/filters/product-filter.pipe";
import {NgbCarouselModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AddProductPopupComponent } from './add-product/add-product-popup/add-product-popup.component';
import { AddCategoryPopupComponent } from './add-product/add-product-popup/add-category-popup/add-category-popup.component';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CartComponent } from './components/cart/cart.component';
import {PositiveOnlyDirective} from "./infrastructure/directives/positive-only.directive";
import {OnlyNumber} from "./infrastructure/directives/OnlyNumber";
import {AuthGuard} from "../auth/auth.guard";
import {AuthorizeGuard} from "../auth/authorize.guard";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ProductEffect} from "./infrastructure/product-store/product-effects/product.effect";
import {productReducer} from "./infrastructure/product-store/product-reducers/product.reducer";
import { ShortenPipe } from './infrastructure/filters/shorten.pipe';
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxPaginationModule} from "ngx-pagination";
import {AddChartPopupComponent} from "./add-product/add-chart-popup/add-chart-popup.component";
import {ChartistModule} from "ng-chartist";
import {ChartsModule} from "ng2-charts";
import {BarecodeScannerLivestreamModule} from "ngx-barcode-scanner";
import {NgxDraggableDomModule} from "ngx-draggable-dom";
import { CalculatorComponent } from './components/calculator/calculator.component';
import { CreatTableComponent } from './components/creat-table/creat-table.component';

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
    AddChartPopupComponent,
    CartComponent,
    PositiveOnlyDirective,
    OnlyNumber,
    ShortenPipe,
    CalculatorComponent,
    CreatTableComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    StoreModule.forFeature('carts', productReducer),
    EffectsModule.forFeature([ProductEffect]),
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgbModule,
    ChartistModule,
    ChartsModule,
    NgbCarouselModule,
    BarecodeScannerLivestreamModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxDraggableDomModule

  ],
  providers: [ CanDeactivateGuard,AuthGuard,AuthorizeGuard]

})
export class ProductModule { }

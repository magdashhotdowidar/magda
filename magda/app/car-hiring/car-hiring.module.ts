import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarHiringRoutingModule } from './car-hiring-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {CarHiringComponent} from "./car-hiring.component";
import { CarHiringHomeComponent } from './core/car-hiring-home/car-hiring-home.component';
import { CarHiringHeaderComponent } from './core/car-hiring-header/car-hiring-header.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxDraggableDomModule} from "ngx-draggable-dom";
import {AuthInterceptor} from "../auth/auth.interceptor";
import {SharedModule} from "../shared/shared.module";
import { CustomizeArrayPipe } from './infrastructure/pipes/customize-array.pipe';
import {AuthGuard} from "../auth/auth.guard";
import {CarHiringViewerComponent} from "./components/car-hiring-viewer/car-hiring-viewer.component";
import {CarItemComponent} from "./components/car-hiring-viewer/car-item/car-item.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";
import {CarManagementComponent} from "./components/car-management/car-management.component";
import {AddVehiclePopupComponent} from "./components/car-management/add-vehicle-popup/add-vehicle-popup.component";
import {NgxPaginationModule} from "ngx-pagination";
import {VehicleFilterPipe} from "./infrastructure/pipes/vehicle-filter.pipe";
import {AuthorizeGuard} from "../auth/authorize.guard";
import {VehicleTransactionComponent} from "./components/car-details/vehicle-transaction-popup/vehicle-transaction.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    CarHiringComponent,
    CarHiringHomeComponent,
    CarHiringHeaderComponent,
    CarHiringViewerComponent,
    CustomizeArrayPipe,
    CarItemComponent,
    CarDetailsComponent,
    CarManagementComponent,
    AddVehiclePopupComponent,
    VehicleTransactionComponent,
    VehicleFilterPipe
  ],
  imports: [
    CommonModule,
    CarHiringRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgbModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    Ng2OrderModule,
    NgxDraggableDomModule,
    NgxPaginationModule,

  ],
  providers: [CanDeactivateGuard,AuthGuard,AuthorizeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]

})
export class CarHiringModule { }

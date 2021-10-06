import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicRoutingModule } from './clinic-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {ClinicComponent} from "./clinic.component";
import { ClinicHomeComponent } from './core/clinic-home/clinic-home.component';
import { ClinicHeaderComponent } from './core/clinic-header/clinic-header.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Ng2OrderModule} from "ng2-order-pipe";
import {NgxDraggableDomModule} from "ngx-draggable-dom";
import {AuthInterceptor} from "../auth/auth.interceptor";

import {SharedModule} from "../shared/shared.module";
import { CustomizeArrayPipe } from './infrastructure/pipes/customize-array.pipe';
import {AuthGuard} from "../auth/auth.guard";
import {ReceptionComponent} from "./components/reception/reception.component";
import {AddDoctorComponent} from "./components/add-doctor/add-doctor.component";
import {RegisterAppointmentComponent} from "./components/register-appointment/register-appointment.component";
import {SearchAppointmentComponent} from "./components/search-appointment/search-appointment.component";
import {NgxPaginationModule} from "ngx-pagination";
import {AppointmentsFilterPipe} from "./infrastructure/pipes/appointments-filter.pipe";
import { DialogComponent } from './components/dialog/dialog.component';
import { EditingComponent } from './components/editing/editing.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    ClinicComponent,
    AddDoctorComponent,
    ReceptionComponent,
    ClinicHomeComponent,
    ClinicHeaderComponent,
    RegisterAppointmentComponent,
    SearchAppointmentComponent,
    CustomizeArrayPipe,
    AppointmentsFilterPipe,
    DialogComponent,
    EditingComponent
  ],
  imports: [
    CommonModule,
    ClinicRoutingModule,
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
    NgxPaginationModule
  ],
  providers: [CanDeactivateGuard,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]

})
export class ClinicModule { }

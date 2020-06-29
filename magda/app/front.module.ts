import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router'


import {Frontcomponent} from './frontcomponent';
import {UserService} from './user/user-infrastructure/user.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {UserComponent} from './user/user.component';
import {SignInComponent} from './user/sign-in/sign-in.component';
import {FrontHomeComponent} from './core/front-home/front-home.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {appRoutes} from './routes';
import {AuthGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth/auth.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {FrontHeaderComponent} from "./core/front-header/front-header.component";
import {ModalModule} from "ngx-bootstrap/modal";
import {TabsModule} from "ngx-bootstrap/tabs";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {CollapseModule} from "ngx-bootstrap/collapse";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {StoreModule} from "@ngrx/store";




export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// @ts-ignore
@NgModule({
  declarations: [
    Frontcomponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    FrontHomeComponent,
    FrontHeaderComponent
  ],
  imports: [
    BrowserModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes,{useHash:true}),
    LoadingBarHttpClientModule,
    LoadingBarModule,

    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })




  ],
  providers: [UserService, AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  exports: [
  ],
  bootstrap: [Frontcomponent]
})
export class FrontModule {
}

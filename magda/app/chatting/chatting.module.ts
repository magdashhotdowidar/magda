import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChattingRoutingModule } from './chatting-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {NgbCarouselModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {ChattingComponent} from "./chatting.component";
import { MainPageComponent } from './components/main-page/main-page.component';
import { ChattingHomeComponent } from './core/chatting-home/chatting-home.component';
import { ChattingHeaderComponent } from './core/chatting-header/chatting-header.component';
import {NgChatModule} from "ng-chat";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { MinimizeDirective } from './infrastructure/directives/minimize.directive';
import { PersonalPageComponent } from './components/personal-page/personal-page.component';
import {ChattingSignInComponent} from "./chatting-user/chatting-sign-in/chatting-sign-in.component";
import {ChattingSignUpComponent} from "./chatting-user/chatting-sign-up/chatting-sign-up.component";
import {ChattingUserComponent} from "./chatting-user/chatting-user.component";
import {ChattingUserService} from "./chatting-user/chatting-user-infrastructure/chatting-user.service";
import {AuthGuard} from "../auth/auth.guard";
import {AuthInterceptor} from "../auth/auth.interceptor";
import {DropdownDirective} from "./infrastructure/directives/dropdown.directive";
import {StoreModule} from "@ngrx/store";
import {messageReducer} from "./infrastructure/store/reducers/message.reducer";
import {EffectsModule} from "@ngrx/effects";
import {MessageEffect} from "./infrastructure/store/effects/message.effect";
import {FriendsFilterPipe} from "./infrastructure/pipes/friends-filter.pipe";
import {ShortenPipe} from "./infrastructure/pipes/shorten.pipe";
import {ShortenِِArrayPipe} from "./infrastructure/pipes/shortenArray.pipe";
import {Ng2OrderModule} from "ng2-order-pipe";


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    ChattingComponent,
    MainPageComponent,
    ChattingHomeComponent,
    ChattingHeaderComponent,
    ChattingSignInComponent,
    ChattingSignUpComponent,
    ChattingUserComponent,
    MinimizeDirective,
    DropdownDirective,
    FriendsFilterPipe,
    PersonalPageComponent,
    ShortenPipe,
    ShortenِِArrayPipe
  ],
  imports: [
    CommonModule,
    ChattingRoutingModule,
    FormsModule,
    NgChatModule,
    NgChatModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarModule,
    NgbModule,
    Ng2OrderModule,
    NgbCarouselModule,
    StoreModule.forFeature('messages', messageReducer),
    EffectsModule.forFeature([MessageEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    Ng2OrderModule

  ],
  providers: [ CanDeactivateGuard,ChattingUserService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]

})
export class ChattingModule { }

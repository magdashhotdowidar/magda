import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialRoutingModule } from './tutorial-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {CanDeactivateGuard} from "../auth/can-deactivate-guard.service";
import {TutorialComponent} from "./tutorial.component";
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TutorialHomeComponent } from './core/tutorial-home/tutorial-home.component';
import { TutorialHeaderComponent } from './core/tutorial-header/tutorial-header.component';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Ng2OrderModule} from "ng2-order-pipe";
import { SideBarPopupComponent } from './components/side-bar/side-bar-popup/side-bar-popup.component';
import { TabPopupComponent } from './components/tab/tab-popup/tab-popup.component';
import {NgxDraggableDomModule} from "ngx-draggable-dom";
import {AuthInterceptor} from "../auth/auth.interceptor";
import {TabComponent} from "./components/tab/tab.component";
import {SharedModule} from "../shared/shared.module";
import { CustomizeArrayPipe } from './infrastructure/pipes/customize-array.pipe';
import {AddParagraphComponent} from "./components/side-bar/add-paragraph/add-paragraph.component";
import {AuthGuard} from "../auth/auth.guard";
import { VideoComponent } from './components/video/video.component';
import { WatchComponent } from './components/video/watch/watch.component';
import { ChannelComponent } from './components/video/channel/channel.component';
import { VideoConfigComponent } from './components/video/video-config/video-config.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    TutorialComponent,
    SideBarComponent,
    TabComponent,
    TutorialHomeComponent,
    TutorialHeaderComponent,
    SideBarPopupComponent,
    TabPopupComponent,
    AddParagraphComponent,
    CustomizeArrayPipe,
    VideoComponent,
    WatchComponent,
    ChannelComponent,
    VideoConfigComponent
  ],
  imports: [
    CommonModule,
    TutorialRoutingModule,
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
    NgxDraggableDomModule

  ],
  providers: [CanDeactivateGuard,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }]

})
export class TutorialModule { }

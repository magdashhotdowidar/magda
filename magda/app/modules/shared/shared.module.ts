import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from "./directives/dropdown.directive";
import {ShortenPipe} from "./pipes/shorten.pipe";
import {AuthorizeViewDirective} from "./directives/auth-view.directive";
import {AlertComponent} from "./alerts/alert.component";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    DropdownDirective,
    AuthorizeViewDirective,
    AlertComponent,
    ShortenPipe
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })

  ],
  exports: [
    DropdownDirective,
    AlertComponent,
    AuthorizeViewDirective,
    ShortenPipe
  ]
})
export class SharedModule {
}

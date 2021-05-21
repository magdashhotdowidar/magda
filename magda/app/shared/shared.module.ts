import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownDirective} from "./directives/dropdown.directive";
import {ShortenPipe} from "./pipes/shorten.pipe";



@NgModule({
  declarations: [
    DropdownDirective,
    ShortenPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[DropdownDirective,
  ShortenPipe]
})
export class SharedModule { }

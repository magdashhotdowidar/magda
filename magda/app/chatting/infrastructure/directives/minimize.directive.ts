import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appMinimize]'
})
export class MinimizeDirective {

@Input('appMinimize')set min(value){
  if (value)this.render.setStyle(this.ElRef.nativeElement,'height','33px');
  else this.render.setStyle(this.ElRef.nativeElement,'height','365px');
}


  constructor(private ElRef:ElementRef,private render:Renderer2) {}


}

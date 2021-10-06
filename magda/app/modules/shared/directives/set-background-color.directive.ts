import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[SetBackgroundColor]'
})
export class SetBackgroundColorDirective implements OnInit{
@Input('SetBackgroundColor')defaultColor:string;
@Input('highlight-color')highlightColor:string;
@HostBinding('style.backgroundColor')backgroundColor:string;

  ngOnInit(): void {
    this.backgroundColor=this.defaultColor;
  }

  @HostListener('mouseleave')mouseleave(eventData:Event){
    this.backgroundColor=this.defaultColor;
  }

  @HostListener('mouseenter')mouseenter(eventData:Event){
    this.backgroundColor=this.highlightColor;
  }


}

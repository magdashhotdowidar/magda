import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[PositiveOnly]'
})
export class PositiveOnlyDirective {
  oldValue=this.ElRef.nativeElement.value;
  constructor(private ElRef:ElementRef) {}

  @HostListener('keyup')setToPositive(){
  if (this.ElRef.nativeElement.value<0)this.ElRef.nativeElement.value=this.oldValue;
  }
}



import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[closeTag]'
})
export class CloseTagDirective {

  constructor(private templateRef:TemplateRef<any>,private vcRef:ViewContainerRef) {
    this.vcRef.createEmbeddedView(this.templateRef);
    setTimeout(() => {
      this.vcRef.clear();
    }, 2000)
  }

}

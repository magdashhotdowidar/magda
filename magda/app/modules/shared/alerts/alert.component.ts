import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {AlertInput} from "./alert-input";

@Component({
  selector: 'app-alert',
  template: `
    <span role="alert" class="alert alert-dismissible fade show h4" *ngIf="alertInput?.appear"
          [ngClass]="{
        'alert-success': alertInput.status == 's',
        'alert-danger': alertInput.status == 'f',
        'alert-warning': alertInput.status == 'w'
      }">

      <!--{{alertInput.errorCode | translate:
        (alertInput.data != null && alertInput.data.length != 0 ? alertInput.data[0] : [])}}-->
      {{ alertInput.errorCode | translate }}
    <button type="button" class="close" (click)="onCloseAlert()">
      <span aria-hidden="true" class="fa fa-close"></span>
    </button>
  </span>

  `
})
export class AlertComponent implements OnInit, OnChanges {
  @Input() alertInput: AlertInput;

  constructor(){
  }

  ngOnInit(){
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.alertInput != null){
      this.alertInput = changes.alertInput.currentValue;
    }
  }

  onCloseAlert(){
    this.alertInput.appear = false;
  }
}

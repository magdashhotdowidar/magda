import {Component, EventEmitter, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}
  close() {
    this.showpopup.emit(false);
  }
}

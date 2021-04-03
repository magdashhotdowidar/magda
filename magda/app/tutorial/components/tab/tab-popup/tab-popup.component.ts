import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'tab-popup',
  templateUrl: './tab-popup.component.html',
  styleUrls: ['./tab-popup.component.css']
})
export class TabPopupComponent implements OnInit{
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService) {}

  ngOnInit() {
  }

  close() {
    this.showpopup.emit(false);
  }


}


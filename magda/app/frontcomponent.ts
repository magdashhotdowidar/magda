import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class Frontcomponent {
  title = 'app';

  constructor(private router :Router) {
  }




}

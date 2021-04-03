import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'tutorial-home',
  templateUrl: './tutorial-home.component.html',
  styleUrls: ['./tutorial-home.component.css']
})
export class TutorialHomeComponent implements OnInit {

  direc: boolean = false;

  constructor( ) {
  }

  ngOnInit() {}
}

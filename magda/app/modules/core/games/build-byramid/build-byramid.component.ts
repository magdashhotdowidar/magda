import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {Path} from "../../../shared/enums/path.enum";
import {na} from "../../../user/sign-in/sign-in.component";
import {Coding} from "../../../shared/enums/coding.enum";

@Component({
  selector: 'app-build-byramid',
  templateUrl: './build-byramid.component.html',
  styleUrls: ['./build-byramid.component.css']
})
export class BuildByramidComponent implements OnInit {

  imagePath: string = Path.productImagePath;
  ASaberWordAr:string=Path.ASaberWordArt;
  mainPath: string = '/' + na + '/' + Coding.front_home;
  height: number = 15;
  middleOfTheHeight: number;
  theShape: string = '';
  holeShape: string[] = [];
  rowCount: number;
  stonesCount: number;
  Shadow: boolean = false;

  buildPyramid() {
    this.holeShape = [];
    this.Shadow = true;
    let row: number = 1;
    this.rowCount = 0;
    this.stonesCount = 0;
    let discount: number = 0;
    this.middleOfTheHeight = this.height / 2;
    for (row; row <= this.height; row++) {
      let roundsSpace: number = (row <= this.middleOfTheHeight) ? this.middleOfTheHeight - row : row - this.middleOfTheHeight;
      for (let space: number = 1; space <= roundsSpace; space++) this.theShape += ' ';
      if (row > this.middleOfTheHeight) discount += 4;
      let roundStone: number = (row <= this.middleOfTheHeight) ? row * 2 - 1 : row * 2 - 1 - discount;
      for (let stone: number = 1; stone <= roundStone; stone++) {
        this.theShape += '*';
        ++this.stonesCount;
      }
      this.holeShape[row - 1] = this.theShape;
      this.theShape = '';
      this.rowCount = row - 2;
    }

  }

  buildPyramidWithNoShadow() {
    this.holeShape = [];
    this.Shadow = false;
    this.stonesCount = 0;
    this.rowCount = 0;
    let space: number = this.height;
    let heart: number = 1;

    for (space; space > 0; space--, heart += 2) {
      for (let x = 0; x < space; x++) this.theShape += ' ';
      for (let x = 0; x < heart; x++) {
        this.theShape += '*';
        ++this.stonesCount

      }
      this.holeShape[space - 1] = this.theShape;
      this.theShape = '';
      ++this.rowCount
    }
    this.holeShape.reverse();
  }

  ngOnInit(): void {
    this.buildPyramid();
  }

}

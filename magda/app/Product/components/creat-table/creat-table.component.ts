import {AfterContentChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Path} from "../../../shared/enums/path.enum";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'creat-table',
  templateUrl: './creat-table.component.html',
  styleUrls: ['./creat-table.component.css']
})
export class CreatTableComponent implements OnInit {
@Input('table')table:MyTable<any>=new MyTable<any>();
  searchByName: string = '';
  searchByBrand:string='';
  searchByCategory:string='';
  searchByAll: string = '';
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  items:number[]=[5,10,15,20,50];
  itemsPerPage:number=5;
  p: number = 1;//initializing the currentPage which is p to 1
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor() { }

  ngOnInit() {
  }

  addColumn(f: NgForm) {
   let columnName:string=f.value['colName']
    let columnTranslate:string=f.value['colTrans']
    this.table.columns.push(new column(columnName,columnTranslate,TableSortClasses.numericAsc))
  }

  deleteColumn(f: NgForm) {
    let columnName:string=f.value['colName']
    this.table.columns.splice(+columnName-1,1)
  }
}
///////////////////////////////////
export class MyTable<TableArrayType>{
  public tableArray:TableArrayType[]=[];
  public columns:column[]=[];
  constructor() {}

}
//////////////////////////////////
export class column {
  constructor(
    public columnName?:string,
    public columnTranslate?:string,
    public columnSortClass?:string
  ){}
}
//-------------------------------
export enum TableSortClasses {
  alphaAsc='fa-sort-alpha-asc ',
  alphaAscInverse='fa-sort-alpha-desc ',
  amountAsc=' fa-sort-amount-asc ',
  amountAscInverse=' fa-sort-amount-desc ',
  numericAsc='fa-sort-numeric-asc ',
  numericAscInverse='fa-sort-numeric-desc ',
  sortUp='fa-sort-up ',
  sortDown='fa-sort-down'
}


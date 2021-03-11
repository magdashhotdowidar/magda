import {AfterContentChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Path} from "../../../shared/enums/path.enum";
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

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
  delete;boolean=false;
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

  constructor(private toast:ToastrService) { }

  ngOnInit() {
  }

  addColumn(f: NgForm) {
   let columnName:string=f.value['colName']
    let columnTranslate:string=f.value['colTrans']
    let contain:boolean=false;
   for(let ob of this.table.columns)if (ob.columnName==columnName)contain=true;
    if(!contain) {
      this.table.columns.push(new column(columnName,columnTranslate,TableSortClasses.numericAsc))
    }else this.toast.warning('this column had been added');
  }

  deleteColumn(f: NgForm) {
    let columnName:number=+f.value['colName'];
    if(columnName>=1&&this.table.columns.length>=1)
    this.table.columns.splice(columnName-1,1)
    this.delete=false;
  }

  showDeleteMessage(f: NgForm) {
    this.delete=true;
    if(+f.value['colName']<=0)
    this.toast.info('Enter Column Number');
  }

  touchAddButton() {
    this.delete=false;
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


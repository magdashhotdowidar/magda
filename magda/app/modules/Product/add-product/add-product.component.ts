import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../infrastructure/models/product';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../infrastructure/services/product.service';
import {ToastrService} from "ngx-toastr";
import {Path} from "../../shared/enums/path.enum";
import {Category} from "../infrastructure/models/category";
import {ProductJasperReportService} from "../infrastructure/services/product-jasper-report.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductResponse} from "../infrastructure/models/ProductResponse.model";
import {column, MyTable, TableSortClasses} from "../components/creat-table/creat-table.component";

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  myTable:MyTable<Product>=new MyTable<Product>();
  products: Product[]=[];
  searchByName: string = '';
  searchByBrand:string='';
  searchByCategory:string='';
  searchByAll: string = '';
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  showAddProductPopup:boolean=false;
  showChartPopup:boolean=false;
  testTable:boolean=false;
  items:number[]=[1,5,10,15,20,50];
  itemsPerPage:number=5;
  p: number = 1;//initializing the currentPage which is p to 1
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr:ToastrService,
              private report:ProductJasperReportService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    let transPath:string='PROJECT.product.edit.product_';
    this.productService.getproductList().subscribe((date:ProductResponse )=> {
      this.products = date.products;
      this.myTable.tableArray=date.products;
      this.myTable.columns=[new column('cod',transPath+'cod',TableSortClasses.alphaAsc),
                            new column('name',transPath+'name',TableSortClasses.amountAsc),
                            new column('brand',transPath+'brand',TableSortClasses.numericAsc)
                           ]
    });
  }
  addNewProduct(event: Product) {
    this.products.push(event);
  }

  deleteProduct(name: string) {
    this.productService.deleteProduct(name)
      .subscribe(
        data => {
          this.reloadData();
        },
        error => console.log(error));
  }


  productDetails(name: string) {
    this.router.navigate(['../p_details', name], {relativeTo: this.route});
  }

  updateProduct(name: string) {
    this.router.navigate(['../p_update', name], {relativeTo: this.route});
  }

  generateProductReport(){
    this.report.generateReport('pdf').subscribe(data=>this.toastr.success('Report Generated Successfully'),
      (error :HttpErrorResponse)=>this.toastr.error(error.message))
  }

}

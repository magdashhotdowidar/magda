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

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = new Product();
  products: Product[];
  searchByName: string = '';
  searchByBrand:string='';
  searchByCategory:string='';
  searchByAmount: string = '';
  searchByPrice: string = '';
  searchByAll: string = '';
  fileEvent: Event = null;
  selectedFile:File;
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  showAddProductPopup:boolean=false;
  showChartPopup:boolean=false;
  items:number[]=[5,10,15,20,50];
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
              private toastr: ToastrService,
              private report:ProductJasperReportService) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.productService.getproductList().subscribe((date:ProductResponse )=> this.products = date.products);
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

  save() {
    const fd=new FormData();

    if (this.fileEvent != null) {
      this.selectedFile = (<HTMLInputElement>this.fileEvent.target).files[0];
      fd.append('file',this.selectedFile,this.selectedFile.name);
      console.log('the selected image',this.selectedFile)
    }

    this.product.imageName=this.selectedFile.name;
    fd.append('product',JSON.stringify( this.product));

    this.productService.createProduct(fd)
      .subscribe(data => {
        this.reloadData();
       console.log(data);
        this.toastr.success("SUCCESSFULLY SAVED");
      }, error => {
        this.toastr.warning("ERROR!!!");
        console.log(error)
      });
    this.product = new Product();
  }

  generateProductReport(){
    this.report.generateReport('pdf').subscribe(data=>this.toastr.success('Report Generated Successfully'),
      (error :HttpErrorResponse)=>this.toastr.error(error.message))
  }

}

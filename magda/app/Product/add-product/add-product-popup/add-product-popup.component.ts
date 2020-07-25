import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../../infrastructure/models/product";
import {ProductService} from "../../infrastructure/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../infrastructure/services/category.service";
import {Category} from "../../infrastructure/models/category";

@Component({
  selector: 'app-add-product-popup',
  templateUrl: './add-product-popup.component.html',
  styleUrls: ['./add-product-popup.component.css']
})
export class AddProductPopupComponent implements OnInit {
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('new-product')newProduct:EventEmitter<Product> = new EventEmitter<Product>();
  product: Product = new Product();
  categories_names:string[]=[];
  selectedValue: string='categories';
  fileEvent: Event = null;
  selectedFile:File;
  show_category_popup:boolean=false;

  constructor(private productService: ProductService,
              private categoryService:CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.getCategorys();
  }

  save() {
    const fd=new FormData();
    this.product.category=this.selectedValue;

    if (this.fileEvent != null) {
      this.selectedFile = (<HTMLInputElement>this.fileEvent.target).files[0];
      fd.append('file',this.selectedFile,this.selectedFile.name);
      this.newProduct.emit(this.product)
     // console.log('the selected image',this.selectedFile)
    }

    this.product.imageName=this.selectedFile.name;
    fd.append('product',JSON.stringify( this.product));

    this.productService.createProduct(fd)
      .subscribe(data => {
        this.toastr.success("SUCCESSFULLY SAVED");
      }, error => {
        this.toastr.warning("ERROR!!!");
        console.log(error)
      });
    this.product = new Product();
  }

  onSubmit(form:NgForm) {
    this.save();
    form.reset();
    this.selectedValue='categories';
  }

  getCategorys(){
this.categoryService.getNames().subscribe(data=>{
  this.categories_names=data},
  error =>{ console.log(error);}
)
  }

  close() {
    this.showpopup.emit(false);
  }

  addNewCategory(event: Category) {
    this.categories_names.push(event.name);
  }
}

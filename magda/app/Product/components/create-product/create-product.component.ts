import {ProductService} from '../../infrastructure/services/product.service';
import {Product} from '../../infrastructure/models/product';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {Invoice} from "../../infrastructure/models/invoice.model";
import {Observable} from "rxjs";
import {InvoiceService} from "../../infrastructure/services/invoice.service";
import {formatDate} from "@angular/common";
import {run} from "tslint/lib/runner";
import {CanComponentDeactivate} from "../../../auth/can-deactivate-guard.service";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../infrastructure/services/category.service";


export class Brand {
  constructor(
    public value: string,
    public viewValue: string
  ) {
  }
}


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],

})
export class CreateProductComponent implements OnInit, CanComponentDeactivate {

  selectedValue: string;
  selectedCategory: string;
  brands: Brand[];
  categories: string[];
  amount: number;
  invoice: Invoice;
  invoices: Observable<Invoice[]>;
  invoiceProducts: Product[];
  invoiceProductsDB: Product[];
  total: number;
  submitted: boolean;
  invoiceSaved: boolean;
  showpopup: boolean;
  defaultDate: Date;
  role: string;


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    // this.selectdata();
    this.getCategorys();
    this.reloadData();
    this.setDefaultData();

  }

  setDefaultData() {
    this.role = localStorage.getItem('role');
    this.selectedValue = 'PRODUCTS';
    this.selectedCategory = 'categories';
    this.amount = 0;
    this.invoice = new Invoice('', '', '', []);
    this.invoiceProducts = [];
    this.invoiceProductsDB = [];
    this.brands = [];
    this.categories = [];
    this.total = 0;
    this.defaultDate = new Date();
    this.submitted = false;
    this.showpopup = false;
    this.invoiceSaved = false;
  }

  reloadData() {
    this.invoices = this.invoiceService.getAllInvoices();
  }


  save() {
    let date: string = formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US');
    this.invoice.date = date;
    this.invoice.productModels = this.invoiceProducts;
    if (this.invoice.customerName == '' || this.invoice.userName == '') this.toastr.warning("Enter CustomerName and UserName")
    else
      this.invoiceService.createInvoice(this.invoice)
        .subscribe(data => {
          this.clear();
          // this.reloadData();
          console.log(data);
          this.toastr.success("SUCCESSFULLY SAVED");
        }, error => {
          this.toastr.warning("ERROR!!!");
          console.log(error)
        });

  }

  clear() {
    this.total = 0;
    this.selectedValue = 'PRODUCTS';
    this.selectedCategory = 'categories';
    this.defaultDate = new Date();
    this.invoice = new Invoice();
    this.invoiceProducts = [];
    this.invoiceProductsDB = [];
    this.amount = 0;
  }

  selectdata() {
    this.brands = [];
    this.productService.getProductsByCategory(this.selectedCategory).subscribe(data => {
      for (let d of data) {
        this.brands.push(new Brand(d.name, d.name));
      }
      //console.log('ahmed names', data)
    })
  }

  getCategorys() {
    this.categoryService.getNames().subscribe(data => {
        this.categories = data
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.save();
    form.reset();
    this.invoiceSaved = true;
  }

  setTotal() {

    this.total = this.invoiceProducts
      .reduce(function (prev, cur) {
        let t: any = cur.amount * cur.price;
        return prev + t;
      }, 0);
  }

  addProduct() {

    let product: Product = new Product();
    let productdb: Product = new Product();
    this.productService.getProduct(this.selectedValue).subscribe(res => {
      productdb = res
      product.price = productdb.price;
      product.name = productdb.name;
      product.amount = this.amount;

      let contain: boolean = false;

      if (this.invoiceProducts.length > 0)
        for (let p of this.invoiceProducts) {
          if (product.name == p.name) contain = true;
        }

      let runOut: boolean = false;

      if (productdb.amount <= 0 || productdb.amount < product.amount) runOut = true;

      if (!contain && !runOut && product.amount != 0 && product.amount != null) {
        this.invoiceProducts.push(product);
        this.setTotal()
        productdb.amount = productdb.amount - product.amount;
        this.productService.updateProduct(productdb.name, productdb).subscribe();

      } else if (contain) this.toastr.error("NO DUPLICATION!!");
      else if (productdb.amount < product.amount) this.toastr.error("THIS AMOUNT NOT AVAILABLE!!");
      else if (productdb.amount <= 0) this.toastr.error("THE PRODUCT IS RUN OUT!!");
      else if (product.amount == 0 && product.amount == null) this.toastr.error("MUST ENTER AMOUNT");


    })

  }

  deleteInvoiceProduct(index: number) {
    let product: Product = new Product();
    this.productService.getProduct(this.invoiceProducts[index].name).subscribe(res => {
      product = res;
      product.amount = product.amount + this.invoiceProducts[index].amount;
      this.productService.updateProduct(product.name, product).subscribe();
      this.invoiceProducts.splice(index, 1);
      this.setTotal()

    })


  }

  checkamount() {
    let productdb: Product;
    this.productService.getProduct(this.selectedValue).subscribe(res => {
      productdb = res
      // @ts-ignore
      if (productdb.amount < this.amount) {
        this.toastr.warning("THE AMOUNT IS OVER STACK!!! ")
      } else {
        this.toastr.success("THE AMOUNT IS AVAILABLE")
      }

    });


  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.invoiceProducts.length > 0 && !this.invoiceSaved) return confirm("Do You Wanna leave without saving the invoice");
    else
      return true;
  }


}

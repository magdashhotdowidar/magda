import {ProductService} from '../../infrastructure/services/product.service';
import {Product, ProductsTable} from '../../infrastructure/models/product';
import {AfterViewChecked, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Invoice} from "../../infrastructure/models/invoice.model";
import {Observable} from "rxjs";
import {InvoiceService} from "../../infrastructure/services/invoice.service";
import {formatDate} from "@angular/common";
import {CanComponentDeactivate} from "../../../auth/can-deactivate-guard.service";
import {NgForm} from "@angular/forms";
import {CategoryService} from "../../infrastructure/services/category.service";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ProductResponse} from "../../infrastructure/models/ProductResponse.model";
import {BarecodeScannerLivestreamComponent} from "ngx-barcode-scanner";


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
export class CreateProductComponent implements OnInit, AfterViewChecked, CanComponentDeactivate {
  // @ts-ignore
  @ViewChild(BarecodeScannerLivestreamComponent)
  barecodeScanner: BarecodeScannerLivestreamComponent;
  barcodeValue;
  userName: string;
  selectedCod: number;
  selectedValue: string;
  selectedCategory: string;
  brands: Brand[];
  categories: string[];
  amount: number;
  invoice: Invoice;
  invoiceProducts: ProductsTable[];
  productsDB: Product[] = [];
  invoicesCount: number = 0;
  total: number;
  submitted: boolean;
  invoiceSaved: boolean;
  showpopup: boolean;
  scanner: boolean;
  showStopScanner:boolean=false;
  scannerMode:string;
  defaultDate: string;
  role: string;
  l: typeof LocalStorage = LocalStorage;


  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private invoiceService: InvoiceService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.reloadProducts();
  }
  openScanner() {
    this.showStopScanner=true;
    this.barecodeScanner.start();
  }
  stopScanner(){
    this.barecodeScanner.stop();
    this.showStopScanner=false;
  }

  onValueChanges(result){
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started){
    console.log(started);
  }

  setDefaultData() {
    this.role = localStorage.getItem(LocalStorage.role);
    this.userName = localStorage.getItem(LocalStorage.userName);
    this.selectedValue = 'PRODUCTS';
    this.selectedCategory = 'categories';
    this.selectedCod=0;
    this.amount = 1;
    this.invoice = new Invoice(this.userName, this.invoicesCount, '', '', []);
    this.invoiceProducts = [];
    this.brands = [];
    this.categories = [];
    this.total = 0;
    this.defaultDate = formatDate(new Date(), 'yyyy-MM-dd | hh:mm a', 'en-US');
    this.submitted = false;
    this.showpopup = false;
    this.scanner = false;
    this.invoiceSaved = false;
  }

  reloadProducts() {
    this.productService.getproductList().subscribe((data: ProductResponse) => {
        this.productsDB = data.products;
        this.invoicesCount = data.invoicesCount;
        this.setDefaultData();
        this.getCategorys();
      },
      (error: HttpErrorResponse) => this.toastr.info(error.message))
  }


  save(form: NgForm) {
    let date: string[] = this.defaultDate.split('|');
    this.invoice.time = date[1].trim();
    this.invoice.date = date[0].trim();
    this.invoice.productModels = this.invoiceProducts;
    if (this.invoice.invoiceNo == 0 || this.invoice.userName == '') this.toastr.warning("Enter InvoiceNo and UserName")
    else
      this.invoiceService.createInvoice(this.invoice)
        .subscribe(data => {
          this.invoicesCount++;
          this.clear();
          this.submitted = true;
          this.invoiceSaved = true;
          this.toastr.success("SUCCESSFULLY SAVED");
        }, error => {
          this.toastr.warning("ERROR!!!");
          console.log(error)
        });

  }

  clear() {
    this.total = 0;
    this.amount = 1;
    this.selectedValue = 'PRODUCTS';
    this.selectedCategory = 'categories';
    this.selectedCod=0;
    this.invoice = new Invoice(this.userName, this.invoicesCount, '', '', []);
    this.invoiceProducts = [];
  }

  selectdata() {
    this.brands = [];
    for (let d of this.productsDB)
      if (d.category == this.selectedCategory) this.brands.push(new Brand(d.name, d.name));
  }

  getCategorys() {
    this.categoryService.getNames().subscribe(data => this.categories = data,
      (error: HttpErrorResponse) => this.toastr.error(error.message))
  }

  onSubmit(form: NgForm) {
    this.save(form);
  }

  setTotal() {

    this.total = this.invoiceProducts
      .reduce(function (prev, cur) {
        let t: any = cur.amount * cur.price;
        return prev + t;
      }, 0);
  }

  addProduct() {

    let product: ProductsTable = new ProductsTable(0,new Product());
    let productdb: Product = new Product();
    if (this.scanner) {
      productdb = this.getProductByCod(this.selectedCod);
    this.selectedCategory=productdb.category;
    this.selectedValue=productdb.name;
    } else productdb = this.getProductByName(this.selectedValue);

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
  }

  getProductByName(name: string): Product {
    for (let i = 0; i < this.productsDB.length; i++)
      if (this.productsDB[i].name == name) return this.productsDB[i];
    return new Product();
  }

  getProductByCod(cod: number): Product {
    for (let i = 0; i < this.productsDB.length; i++)
      if (this.productsDB[i].cod == cod) return this.productsDB[i];
    return new Product();
  }

  deleteInvoiceProduct(index: number) {
    let product: Product = new Product();
    this.productService.getProduct(this.invoiceProducts[index].name).subscribe(res => {
      product = res;
      product.amount = product.amount + this.invoiceProducts[index].amount;
      this.productService.updateProduct(product.name, product).subscribe();
      this.invoiceProducts.splice(index, 1);
      this.setTotal()
      this.selectedCod=0;
      this.selectedValue='PRODUCT';
      this.selectedCategory='CATEGORY';
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

  ngAfterViewChecked(): void {
    this.defaultDate = formatDate(new Date(), 'yyyy-MM-dd | hh:mm a', 'en-US');
    this.setScannerMode();
  }
  setScannerMode(){
    if (this.scanner)this.scannerMode='PROJECT.breadcrumb.scanner_mode';
    else this.scannerMode='PROJECT.breadcrumb.traditional_mode';
  }


}

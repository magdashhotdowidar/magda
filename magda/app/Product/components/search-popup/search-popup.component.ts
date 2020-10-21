import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Invoice} from "../../infrastructure/models/invoice.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InvoiceService} from "../../infrastructure/services/invoice.service";
import {Product, ProductsTable} from "../../infrastructure/models/product";
import {formatDate} from "@angular/common";
import {InvoiceResponse} from "../../infrastructure/models/invoiceResponse.model";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../infrastructure/services/product.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-search-popup',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.css']
})
export class SearchPopupComponent implements OnInit {
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedInvoice = new EventEmitter<Invoice>();
  invoicesForOneCustomer: Invoice[];
  allInvoices: Invoice[];
  invoiceProductsDB: ProductsTable[];
  matchAny: boolean;
  showTime: boolean=false;
  defaultDate: Date;
  moreOptions: boolean;
  showAllInvoicesTable: boolean;
  invoiceNODB: number;
  userDB: string;
  dateDB: string;
  show: string;
  total: number;
  searchByInvoiceNo:number=0;
  searchByDate:string='';

  invoiceSearchForm = this.fb.group({
    invoiceNo: 0,
    date: null
  });
  //sort and pagination
  items:number[]=[5,10,15,20,50];
  itemsPerPage:number=5;
  p: number = 1;//initializing the currentPage which is p to 1
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private fb: FormBuilder,
              private invoiceService: InvoiceService,
              private productService: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.invoicesForOneCustomer = [];
    this.defaultDate = new Date();
    this.allInvoices = [];
    this.invoiceProductsDB = [];
    this.matchAny = false;
    this.moreOptions = false;
    this.showAllInvoicesTable = false;
    this.total = 0;

  }

  getInvoice() {
    let invoiceNo: number = this.invoiceSearchForm.get('invoiceNo').value;
    let date = formatDate(this.defaultDate, 'yyyy-MM-dd | hh:mm a', 'en-US');

    this.invoiceService.getInvoice(invoiceNo, 	date.split('|')[0].trim()).subscribe((res: InvoiceResponse) => {
        // console.log('THE RETURNED RESPONSE : ', res)
        this.invoicesForOneCustomer = res.invoices;
        if (this.invoicesForOneCustomer != null && this.invoicesForOneCustomer.length > 0) {
          this.invoiceNODB = this.invoicesForOneCustomer[0].invoiceNo;
          this.userDB = this.invoicesForOneCustomer[0].userName;
          this.dateDB = this.invoicesForOneCustomer[0].date;
        }

        this.allInvoices = [];
        this.invoiceProductsDB = [];
        if (this.invoicesForOneCustomer != null)
          for (let i = 0; i < this.invoicesForOneCustomer.length; i++) {
            this.allInvoices.push(this.invoicesForOneCustomer[i]);
            //  this.invoiceProductsDB.push(...invoice.productModels);
            for (let p of this.invoicesForOneCustomer[i].productModels) {
              this.invoiceProductsDB.push(new ProductsTable(i + 1, p));
            }
            // console.log('obtained invoice by customer name and date : ', invoice)
          }

        this.total = this.setTotal(this.invoiceProductsDB);

        if (res.message.match("THE INVOICE NO " + invoiceNo + " IS FOUNDED"))
          this.toastr.success(res.message);
        else this.toastr.warning(res.message);
        this.invoiceSearchForm.reset();
      },
      (error:HttpErrorResponse )=> this.toastr.warning(error.message))
  }

  getAllInvoices() {
    this.allInvoices=[];
    this.searchByInvoiceNo=0;
    this.searchByDate='';
    this.invoiceService.getAllInvoices().subscribe(
      res => {
        this.showAllInvoicesTable = true;
        this.allInvoices = res;
        this.moreOptions = false;
        // console.log('all invoices  : ', this.allInvoices);
      })
  }
  closeallivoicestabel(){
    if (this.showAllInvoicesTable==true)this.showAllInvoicesTable=false
  }

  deleteInvoice() {

    let invoiceNo: number = this.invoiceSearchForm.get('invoiceNo').value;
    let date = formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US');
    this.invoiceService.deleteInvoice(invoiceNo, date).subscribe(res => {
      this.invoiceSearchForm.reset();
      if (res.deleted = true) this.toastr.success("SUCCESSFULLY DELETION!!");
      this.moreOptions = false;
    })
  }

  deleteAllInvoices() {
    this.invoiceService.deleteAllInvoices().subscribe(res => {
      this.toastr.success("SUCCESSFULLY DELETION!!");
      this.moreOptions = false;
    })

  }

  setTotal(products: ProductsTable[]): number {
    let total: number = products
      .reduce(function (prev, cur) {
        let t: any = cur.amount * cur.price;
        return prev + t;
      }, 0);

    return total;
  }


  invoiceDetails(i: number) {
    let invoice: Invoice = this.invoicesForOneCustomer[i - 1];
    let productsCount: number = invoice.productModels.length;
    let invoiceNO: number = invoice.invoiceNo;
    let user: string = invoice.userName;
    let date: string = invoice.date;
    let products: string = '[';
    let total = invoice.productModels.reduce(function (prev, cur) {
      let t: any = cur.amount * cur.price;
      return prev + t;
    }, 0);
    for (let p of invoice.productModels) {
      products += p.name + ',';
    }
    products += ']';
    this.show = 'Invoice no(' + i + ')\nINVOICE NO(' + invoiceNO + ')\nUser Name(' + user + ')\nDate(' + date + ')\nProducts Count(' + productsCount + ')\nProducts(' + products + ')\nThe Total(' + total + ')';
    // alert(this.show);

  }

  close() {
    this.showpopup.emit(false);
  }

  cons(p: ProductsTable) {
    let productdb: Product;
    this.productService.getProduct(p.name).subscribe(res => {
      productdb = res;
      let show: string = 'productName(' + productdb.name + ')\nProductAmount(' + productdb.amount + ')\nproductPrice(' + productdb.price + ')';
      alert(show);
    })
  }

  invoiceProducts(products: Product[], i: number) {
    this.show = '[\nproducts Count(' + products.length + ')\n________________\n';
    for (let product of products) {
      this.show += 'productName(' + product.name + ')\nProductAmount(' + product.amount + ')\nproductPrice(' + product.price + ')\nSub Total(' + product.price*product.amount + ')\n________________\n';
    }
    this.show += ']';
    if (i == 1) alert(this.show);
  }


}

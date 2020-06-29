import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Invoice} from "../infrastructure/models/invoice.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {InvoiceService} from "../infrastructure/services/invoice.service";
import {Product, ProductsTable} from "../infrastructure/models/product";
import {formatDate} from "@angular/common";
import {InvoiceResponse} from "../infrastructure/models/invoiceResponse.model";
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../infrastructure/services/product.service";

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
  defaultDate: Date;
  moreOptions: boolean;
  showAllInvoicesTable: boolean;
  customerDB: string;
  userDB: string;
  dateDB: string;
  show: string;
  total: number;
  searchByCustomerName:string='';
  searchByDate:string='';

  invoiceSearchForm = this.fb.group({
    customerName: null,
    date: null
  });

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
    let customer: string = this.invoiceSearchForm.get('customerName').value;
    let date = formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US');

    this.invoiceService.getInvoice(customer, date).subscribe((res: InvoiceResponse) => {
        // console.log('THE RETURNED RESPONSE : ', res)
        this.invoicesForOneCustomer = res.invoices;
        if (this.invoicesForOneCustomer != null && this.invoicesForOneCustomer.length > 0) {
          this.customerDB = this.invoicesForOneCustomer[0].customerName;
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

        if (res.message.match("THE INVOICE FOR CUSTOMER " + customer + " IS FOUNDED"))
          this.toastr.success(res.message);
        else this.toastr.warning(res.message);
        this.invoiceSearchForm.reset();
      },
      error => this.toastr.warning("ERROR!!!"))
  }

  getAllInvoices() {
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

    let customer: string = this.invoiceSearchForm.get('customerName').value;
    let date = formatDate(this.defaultDate, 'yyyy-MM-dd', 'en-US');
    this.invoiceService.deleteInvoice(customer, date).subscribe(res => {
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

  setTotal(products: Product[]): number {
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
    let customer: string = invoice.customerName;
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
    this.show = 'Invoice no(' + i + ')\nCustomer Name(' + customer + ')\nUser Name(' + user + ')\nDate(' + date + ')\nProducts Count(' + productsCount + ')\nProducts(' + products + ')\nThe Total(' + total + ')';
    // alert(this.show);

  }

  close() {
    this.showpopup.emit(false);
  }

  cons(p: Product) {
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

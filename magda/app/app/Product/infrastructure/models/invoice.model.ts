import {Product, ProductsTable} from "./product";


export class Invoice {

  public date:string;
  public time:string;
  public userName: string;
  public invoiceNo:number;
  public productModels: ProductsTable[];


  constructor(userName?: string, invoiceNo?: number, date?:string,time?:string, productModels?:ProductsTable[]) {
   this.userName=userName;
    this.invoiceNo=invoiceNo;
    this.date=date;
    this.time=time;
   this.productModels=productModels;
  }
}

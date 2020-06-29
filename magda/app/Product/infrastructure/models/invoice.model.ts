import {Product} from "./product";


export class Invoice {

  public date:string;
  public userName: string;
  public customerName: string;
  public productModels: Product[];


  constructor(userName?: string, customerName?: string, date?:string, productModels?:Product[]) {
   this.userName=userName;
    this.customerName=customerName;
    this.date=date;
   this.productModels=productModels;
  }
}

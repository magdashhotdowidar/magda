import {Product} from "./product";
import {Invoice} from "./invoice.model";


export class InvoiceResponse {

public invoices:Invoice[];
public message:string;


  constructor(invoices?: Invoice[], message?: string) {
this.invoices=invoices;
this.message=message;
  }
}

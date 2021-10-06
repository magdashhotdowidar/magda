import {Product} from "./product";
import {Invoice} from "./invoice.model";


export class ProductResponse {

public products:Product[];
public invoicesCount:number;

  constructor(products: Product[], invoicesCount: number) {
    this.products = products;
    this.invoicesCount = invoicesCount;
  }
}

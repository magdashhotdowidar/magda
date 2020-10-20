export class Product {
  cod:number;
  name: string;
  brand?: string;
  description?: string;
  category?: string;
  amount: number;
  price: number;
  imageName?: string;

}

export class ProductsTable {
  public invoiceNo: number;
  cod:number;
  name: string;
  amount: number;
  price: number;

  constructor(no?: number, product?: Product) {
    this.invoiceNo = no;
    this.cod=product.cod;
    this.name = product.name;
    this.amount = product.amount;
    this.price = product.price;

  }
}


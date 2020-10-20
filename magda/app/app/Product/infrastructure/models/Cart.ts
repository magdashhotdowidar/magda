export class Cart {
  name: string;
  user?: string;
  amount: number;
  price: number;
  total:number;
  imageName?: string;


  constructor(name?: string, user?: string, amount?: number, price?: number, total?: number, imageName?: string) {
    this.name = name;
    this.user = user;
    this.amount = amount;
    this.price = price;
    this.total = total;
    this.imageName = imageName;
  }
}


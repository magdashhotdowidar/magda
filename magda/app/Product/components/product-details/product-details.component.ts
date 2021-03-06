import {Product} from '../../infrastructure/models/product';
import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../infrastructure/services/product.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CartService} from "../../infrastructure/services/cart.service";
import {Cart} from "../../infrastructure/models/Cart";
import {ToastrService} from "ngx-toastr";
import {Path} from "../../../shared/enums/path.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  name: string;
  product: Product;
  buy: boolean = false;
  payment:boolean=false;
  user = localStorage.getItem(LocalStorage.userName);
  l:typeof LocalStorage=LocalStorage;
  role=localStorage.getItem(LocalStorage.role);
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  amount: number;
  cardNumberPattern:string='/^([0-9]{4}( |\-)){3}[0-4]{4}$/';//'[0-9]{3}-[0-9]{2}-[0-9]{3}';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private cartService: CartService,
              private toastr: ToastrService,
             // private store:Store<ProductStoreStates>
  ) {
  }

  ngOnInit() {
    this.product = new Product();

    this.name = this.route.snapshot.params['name'];

    this.productService.getProduct(this.name)
      .subscribe(data => {
        this.product = data;
        // console.log(data)
      }, error => console.log(error));
  }

  addToCart() {
    let cart: Cart = new Cart();

    cart.name = this.product.name;
    cart.user = this.user;
    cart.amount = this.amount;
    cart.price = this.product.price;
    cart.total = this.product.price * this.amount;
    cart.imageName = this.product.imageName;
    this.cartService.getCartLineByUserAndProductName(cart.user, cart.name).subscribe(data => {
        let carts: Cart[] = data;
        if (carts.length == 0) {
          this.cartService.createCartLine(cart).subscribe(data => {
            this.product.amount -= cart.amount
            this.productService.updateProduct(this.product.name, this.product).subscribe(res => {

             // this.store.dispatch(new AddCart(cart.user));
              this.router.navigate(['../../cart'], {relativeTo: this.route});
            })

          });
        } else this.toastr.error("This Product is already Exist")
      },
      error => console.log(error.error))

  }

  list() {
    this.router.navigate(['../../add'], {relativeTo: this.route});
  }


}

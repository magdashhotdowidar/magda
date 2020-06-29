import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";
import {CartService} from "../infrastructure/services/cart.service";
import {Cart} from "../infrastructure/models/Cart";
import {ProductService} from "../infrastructure/services/product.service";
import {Product} from "../infrastructure/models/product";
import {Path} from "../../shared/enums/path.enum";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  user = localStorage.getItem('userName');
  cartLines: Cart[] = [];
  cartLineSaved: boolean = false;
  private total: number;

  constructor(private cartService: CartService,
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private title: Title
  ) {
  }

  ngOnInit() {
    this.title.setTitle('CART');
    this.reload();
  }

  reload() {
    this.cartService.getCartLineByUser(this.user).subscribe(data => {
      this.cartLines = data;
      this.setTotal();
    });
  }

  updateCartLine(user: string, name: string, cartLine: Cart) {

    this.productService.getProduct(name).subscribe(data => {
      let dis: boolean = false;
      let product: Product = data;
      let amount: number = 0;
      this.cartService.getCartLineByUserAndProductName(user, name).subscribe((data2: Cart[]) => {
        let cartLine2: Cart[] = data2;
        amount = cartLine2[0].amount - cartLine.amount;
        if (amount != 0) {
          product.amount += amount;
          this.productService.updateProduct(product.name, product).subscribe(res => {
            cartLine.total = cartLine.amount * cartLine.price;
            this.cartService.updateCartLine(user, name, cartLine).subscribe(
              res => {
                this.toastr.success("SUCCESSFULLY UPDATING");
                this.reload();
              },
              error => this.toastr.error("UPDATE FAILED")
            )
          })
        } else this.toastr.warning('No Modification Happened')

      })

    })

  }

  deleteCartLine(user: string, productName: string) {
    this.cartService.deleteCartLine(user, productName).subscribe(
      res => {
        this.toastr.success("SUCCESSFULLY DELETION");
        this.reload();
      },
      err => {
        this.toastr.error("DELETION FAILED");
        console.log(err.error);
      })
  }

  setTotal() {

    this.total = this.cartLines
      .reduce(function (prev, cur) {
        let t: any = cur.amount * cur.price;
        return prev + t;
      }, 0);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cartLines.length > 0 && !this.cartLineSaved) return confirm("Do You Wanna leave without saving the invoice");
    else
      return true;
  }

}

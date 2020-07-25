import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {Product} from "../../infrastructure/models/product";
import {ProductService} from "../../infrastructure/services/product.service";


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

 name :string;
  product:Product;

  constructor(private route: ActivatedRoute,private router: Router,
    private productService: ProductService) { }

  ngOnInit() {
    this.product = new Product();

    this.name = this.route.snapshot.params['name'];

    this.productService.getProduct(this.name)
      .subscribe(data => {
        this.product = data;
      }, error => console.log(error));
  }

  updateProduct() {
    this.productService.updateProduct(this.name, this.product)
      .subscribe(data => console.log(data), error => console.log(error));
    this.product = new Product();
    this.gotoList();
  }

  onSubmit() {
    this.updateProduct();
  }

  gotoList() {
    this.router.navigate(['../../add'],{relativeTo:this.route});
  }
}

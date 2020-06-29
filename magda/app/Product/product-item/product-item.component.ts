import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../infrastructure/models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {Path} from "../../shared/enums/path.enum";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  @Input() product:Product=new Product();

 // link:string='../p_details/'+this.product.name

  constructor(  private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
  }

  productDetails(name: string) {
    if (this.router.url.split('/').length==5)
   this.router.navigate(['../p_details', name], {relativeTo: this.route});
    else this.router.navigate(['p_details', name], {relativeTo: this.route});
  }


}

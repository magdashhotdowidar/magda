import {Component, OnInit} from '@angular/core';
import {ProductService} from "../infrastructure/services/product.service";
import {Product} from "../infrastructure/models/product";
import {Path} from "../../shared/enums/path.enum";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  carouselData: Product[]=[];
  groupingProducts: any;


  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getGroupingProducts();
  }

  getGroupingProducts() {
    this.productService.getProductsInGroups().subscribe(data => {
        this.groupingProducts = data;
       this.getCarouselData();
        //  console.log('products in groups : ',this.groupingProducts[0][2])
      }
      , error => console.log('obtained error', error));

  }

  getCarouselData() {
    if (this.groupingProducts) {
      for (let prod of this.groupingProducts) {
        if (prod[0]) this.carouselData.push(prod[0])
      }
    }
  }

}

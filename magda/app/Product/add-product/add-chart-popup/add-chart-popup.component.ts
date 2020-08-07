import {AfterViewInit, Component, DoCheck, EventEmitter, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ProductService} from "../../infrastructure/services/product.service";
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import {ChartEvent, ChartType} from 'ng-chartist';
import {Product} from "../../infrastructure/models/product";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'product-bar-chart',
  template: `
      <div class="modal-dialog modal-dialog-scrollable modal-lg  " role="document">
          <div class="modal-content">
              <div class="modal-header" style="background-color:blue ">
                  <h6 style="color: white;font-size: x-large">{{'PROJECT.breadcrumb.chart'|translate}}</h6>
                  <button type="button" (click)="close()" style="background-color: red" data-dismiss="modal"
                          aria-label="Close"
                          id="chartPopupClose">
                      <i class="fa fa-close" aria-hidden="true" style="color:yellow;font-size:x-large "></i>
                  </button>
              </div>
              <div class="modal-body" style="background-color: white;min-height:fit-content">
                  <x-chartist
                          [type]="type"
                          [data]="data"
                          [options]="options"
                          [events]="events"
                  ></x-chartist>
              </div>
              <div class="modal-footer" style="background-color: blue"></div>
          </div>
      </div>
  `
})

export class AddChartPopupComponent implements OnInit {

  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  labels: string[] = [];
  series: number[] = [];
  type: ChartType = 'Bar';
  data: IChartistData;
  options: IBarChartOptions;
  events: ChartEvent;

  constructor(private productService: ProductService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.loadChartDAta();
  }

  loadChartDAta() {
    this.productService.getproductList().subscribe((data: Product[]) => {

      for (let product of data) {
        this.labels.push(product.name);
        this.series.push(product.amount);
      }

      this.data = {
        labels: this.labels,
        series: [
          this.series
        ]
      };

      this.options = {
        axisX: {
          showGrid: false
        },
        height: 300
      };

      this.events = {
        draw: (data) => {
          if (data.type === 'bar') {
            data.element.animate({
              y2: <IChartistAnimationOptions>{
                dur: '0.5s',
                from: data.y1,
                to: data.y2,
                easing: 'easeOutQuad'
              }
            });
          }
        }
      };

    }, (error: HttpErrorResponse) => this.toastr.error(error.message));
  }

  close() {
    this.showpopup.emit(false);
  }

}

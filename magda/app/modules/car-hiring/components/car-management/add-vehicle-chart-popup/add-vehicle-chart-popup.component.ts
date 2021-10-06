import {AfterViewInit, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {
  IChartistData
} from 'chartist';
import {HttpErrorResponse} from "@angular/common/http";
import {DOCUMENT} from "@angular/common";
import * as Chart from "chart.js";
import {ChartData, VehicleService} from "../../../infrastructure/services/vehicle.service";

@Component({
  selector: 'vehicle-bar-chart',
  template: `
      <div class="modal-dialog modal-dialog-scrollable modal-lg" ngxDraggableDom="true" role="document">
          <div class="modal-content">
              <div class="modal-header" style="background-color:white;color:blue">
                  <div class="row">
                      <label style="background-color: darkmagenta;padding:10px 10px;color:orangered;border: 3px solid white;border-radius:50%;cursor:pointer;font-size: large">{{'PROJECT.breadcrumb.chart'|translate}}</label>
                      <a (click)="byDailyFee()"> {{'PROJECT.breadcrumb.vehicleDailyFee_chart'|translate}}</a>
                      <a (click)="byReservationCount()"> {{'PROJECT.breadcrumb.vehicleReservationCount_chart'|translate}}</a></div>
                  <div (change)="setChart()" class="custom-radio" *ngFor="let formChart of chartForms" style="color: blue;font-size: large">
                      <label>
                          <input type="radio" [(ngModel)]="chartType" [value]="formChart"/>{{formChart}}
                      </label>
                  </div>

                  <button type="button" (click)="close()" style="background-color:blue" data-dismiss="modal"
                          aria-label="Close"
                          id="vehicleChartPopupClose">
                      <i class="fa fa-close" aria-hidden="true" style="color:red;font-size:x-large "></i>  
                  </button>
              </div>
              <div class="modal-body" style="background-color: white;min-height:fit-content">
                  <h5 class="text-center" style="color: red">{{message|translate}}</h5>
                  <canvas id="myChart" width="800" height="450"></canvas>
              </div>
              <div class="modal-footer" style="background-color: blue"></div>
          </div>
      </div>
  `,
  styles: ['a{padding:10px 10px;color:orangered;background-color:lime;border: 3px solid white;border-radius:50%;cursor:pointer }']
})

export class AddVehicleChartPopupComponent implements OnInit {

  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  labels: string[] = [];
  series: number[] = [];
  data: IChartistData;
  chartForms: string[] = ['bar', 'line', 'radar']
  message: string = '';
  chartType: string = 'bar';

  constructor(@Inject(DOCUMENT) private document,
              private vehicleService: VehicleService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
     this.byDailyFee();
  }

  byDailyFee() {
    this.labels = [];
    this.series = []
    this.message='PROJECT.vehicle.chart_dailyFee_message'
    this.vehicleService.getChartDataDailyFee().subscribe((data: ChartData[]) => {
      for (let item of data) {
        this.labels.push(item[0]);
        this.series.push(item[1]);
      }
      this.setChart();
    }, (error: HttpErrorResponse) => this.toastr.error(error.message));
  }

  byReservationCount() {
    this.labels = [];
    this.series = [];
    this.message='PROJECT.vehicle.chart_reservationCount_message'
    this.vehicleService.getChartDataReservationCount().subscribe((data: ChartData[]) => {
      for (let item of data) {
        this.labels.push(item[0]);
        this.series.push(item[1]);
      }
      this.setChart();
    }, (error: HttpErrorResponse) => this.toastr.error(error.message));
  }

  setChart() {
    let colors: string[] = [];
    for (let c = 0; c < this.labels.length; c++) {
      if (c % 2 == 0) {
        colors.push("rgba(153,255,51,1)")
      } else colors.push("rgba(255,153,0,1)")
    }
    new Chart(this.document.getElementById("myChart"), {
      type: this.chartType,
      data: {
        labels: this.labels,
        datasets: [{
          label: 'apples',
          data: this.series,
          borderColor: "rgba(153,255,51,1)",
          backgroundColor: colors
        }, {
          label: 'oranges',
          borderColor: "rgba(255,153,0,1)",
          backgroundColor: "rgba(255,153,0,1)"
        }]
      }
    });
  }

  close() {
    this.showpopup.emit(false);
  }
}

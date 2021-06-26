import {Component, OnInit} from '@angular/core';


import {Path} from "../../../shared/enums/path.enum";
import {VehicleService} from "../../infrastructure/services/vehicle.service";
import {CarDto, VehicleDto, VehicleResponseDto} from "../../infrastructure/models/vehicle.models";

@Component({
  selector: 'car-viewer',
  templateUrl: './car-hiring-viewer.component.html',
  styleUrls: ['./car-hiring-viewer.component.css']
})
export class CarHiringViewerComponent implements OnInit {
  path: typeof Path = Path;
  imgPath: string = this.path.vehicleImagePath;
  carouselData: any[] = [];
  groupingVehicles: VehicleResponseDto;
  viewerData: Array<any[]>=[];


  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.getGroupingProducts();
  }

  getGroupingProducts() {
    this.vehicleService.getAllVehicles().subscribe(data => {
        this.groupingVehicles = data;
        this.getCarouselData();
        //  console.log('products in groups : ',this.groupingProducts[0][2])
      }
      , error => console.log('obtained error', error));

  }

  getCarouselData() {
    if (this.groupingVehicles.sports.length) {
      if (this.groupingVehicles.sports[0]) this.carouselData.push(this.groupingVehicles.sports[0]);
      this.viewerData.push(this.groupingVehicles.sports)
    }

    if (this.groupingVehicles.suvList.length > 0) {
      if (this.groupingVehicles.suvList[0]) this.carouselData.push(this.groupingVehicles.suvList[0]);
      this.viewerData.push(this.groupingVehicles.suvList)
    }
    if (this.groupingVehicles.swList.length > 0) {
      if (this.groupingVehicles.swList[0]) this.carouselData.push(this.groupingVehicles.swList[0]);
      this.viewerData.push(this.groupingVehicles.swList)
    }
    if (this.groupingVehicles.transportTrucks.length > 0) {
      if (this.groupingVehicles.transportTrucks[0]) this.carouselData.push(this.groupingVehicles.transportTrucks[0]);
      this.viewerData.push(this.groupingVehicles.transportTrucks)
    }


  }


}

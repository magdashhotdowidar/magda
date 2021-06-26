import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {CarDto, VehicleDto, VehicleResponseDto} from "../../infrastructure/models/vehicle.models";
import {Path} from "../../../shared/enums/path.enum";
import {VehicleService} from "../../infrastructure/services/vehicle.service";

@Component({
  selector: 'car-management',
  templateUrl: './car-management.component.html',
  styleUrls: ['./car-management.component.css']
})
export class CarManagementComponent implements OnInit {
  //myTable:MyTable<Product>=new MyTable<Product>();
  response: VehicleResponseDto;
  transPath: string = 'PROJECT.product.edit.product_';
  vehiclesType: string[] = ['sport', 'suv', 'sw', 'transport', 'small', 'car', 'truck'];
  carsOption: string[] = ['select car', 'cars', 'sport', 'suv', 'sw'];
  carOption: string = 'select car';
  trucksOption: string[] = ['select truck', 'trucks', 'transport', 'small'];
  truckOption: string = 'select truck';
  cars: any[] = [];
  searchByName: string = '';
  searchByBrand: string = '';
  searchByCategory: string = '';
  searchByAll: string = '';
  path: typeof Path = Path;
  imgPath: string = this.path.productImagePath;
  showAddProductPopup: boolean = false;
  showChartPopup: boolean = false;
  testTable: boolean = false;
  items: number[] = [5, 10, 15, 20, 50];
  itemsPerPage: number = 5;
  p: number = 1;//initializing the currentPage which is p to 1
  key: string = 'name'; //set default
  reverse: boolean = false;
  moreOptions: boolean;
  matchAny: boolean;
  openPrivacy: boolean;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  constructor(public vehicleService: VehicleService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.vehicleService.getAllVehicles().subscribe(data => {
        this.response = data;
        this.cars = data.vehicles
      },
      ((error: HttpErrorResponse) => this.toastr.error('error in reload :' + error.message)))
  }

  getAllVehicles() {
    this.carOption = 'select car';
    this.truckOption = 'select truck'
    this.cars = this.response.vehicles
  }

  getCars() {
    this.truckOption = 'select truck'
    if (this.carOption.match('cars')) this.cars = this.response.cars;
    else if (this.carOption.match('sport')) this.cars = this.response.sports;
    else if (this.carOption.match('suv')) this.cars = this.response.suvList;
    else if (this.carOption.match('sw')) this.cars = this.response.swList;

  }

  getTrucks() {
    this.carOption = 'select car';
    if (this.truckOption.match('truck')) this.cars = this.response.trucks;
    else if (this.truckOption.match('transport')) this.cars = this.response.transportTrucks;
  }

  getAvailableVehicles() {
    this.carOption = 'select car';
    this.truckOption = 'select truck'
    this.cars = this.response.availableVehicles;
  }

  addNewProduct(event: CarDto) {
    this.cars.push(event);
  }

  deleteVehicle(name: string) {
    this.vehicleService.deleteVehicle(name).subscribe(data => {
        this.reloadData();
          this.toastr.success('successfully Deletion');
        },
        error => this.toastr.error("'error in delete vehicle"));
  }

  deleteAllVehicle() {
    this.vehicleService.deleteAllVehicle().subscribe(data => {
        this.reloadData();
        this.toastr.success('successfully Deletion');
      },
      error => this.toastr.error("'error in delete all vehicles"));
  }
  deleteAllVehicleNull() {
    this.vehicleService.deleteAllVehicleNulls().subscribe(data => {
        this.reloadData();
        this.toastr.success('successfully Deletion');
      },
      error => this.toastr.error("'error in delete all vehicles nulls"));
  }


  productDetails(num: string) {
    this.router.navigate(['../v_details', num], {relativeTo: this.route});
  }

  updateProduct(name: string) {
    this.router.navigate(['../p_update', name], {relativeTo: this.route});
  }

}

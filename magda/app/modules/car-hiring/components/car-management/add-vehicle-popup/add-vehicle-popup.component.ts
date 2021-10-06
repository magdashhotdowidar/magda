import {AfterViewChecked, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {
  CarDto,
  SportsDto,
  SuvDto,
  SWDto,
  TransportTruckDto, TruckDto,
  VehicleDto
} from "../../../infrastructure/models/vehicle.models";
import {VehicleService} from "../../../infrastructure/services/vehicle.service";

@Component({
  selector: 'add-vehicle-popup',
  templateUrl: './add-vehicle-popup.component.html',
  styleUrls: ['./add-vehicle-popup.component.css']
})
export class AddVehiclePopupComponent implements OnInit ,AfterViewChecked{
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output('new-vehicle')newProduct:EventEmitter<CarDto> = new EventEmitter<CarDto>();
  vehicle :any= new VehicleDto();
  plateNumber:string='';
  fees:number;
  tiresNum:number;
  price:number;
  loadingCap:number;
  goesAbroad:boolean;
  color:string='';
  doors:number;
  seatingNum:number;
  remotely:boolean;
  horsepower:number;
  wheelType:number;
  selectedValue: string='types';
  fileEvent: Event = null;
  selectedFile:File;
  vehiclesType: string[]=['sport','suv','sw','transport','small','car','truck'];
  booleans:boolean[]=[true,false]

  constructor(private vehicleService:VehicleService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit() {

  }
  setTheObject(){
    if (this.selectedValue=='sport')this.vehicle=new SportsDto();
    else if (this.selectedValue=='suv')this.vehicle=new SuvDto();
    else if (this.selectedValue=='sw')this.vehicle=new SWDto();
    else if (this.selectedValue=='transport')this.vehicle=new TransportTruckDto();
    else if (this.selectedValue=='car')this.vehicle=new CarDto();
    else if (this.selectedValue=='truck')this.vehicle=new TruckDto();
  }

  save() {
    const fd=new FormData();
    this.setTheObject();

    if (this.fileEvent != null) {
      this.selectedFile = (<HTMLInputElement>this.fileEvent.target).files[0];
      fd.append('file',this.selectedFile,this.selectedFile.name);
      this.newProduct.emit(this.vehicle)
     // console.log('the selected image',this.selectedFile)
    }

    this.vehicle.imageName=this.selectedFile.name;
    this.vehicle.vehicleType=this.selectedValue;
    this.vehicle.plateNumber=this.plateNumber;
    this.vehicle.dailyFee=this.fees;
    this.vehicle.price=this.price;
    this.vehicle.numberOfTires=this.tiresNum;
    this.vehicle.loadingCap=this.loadingCap;
    this.vehicle.goesAbroad=this.goesAbroad;
    this.vehicle.deliverDroppingOffRemotely=this.remotely;
    this.vehicle.color=this.color;
    this.vehicle.seatingCap=this.seatingNum;
    this.vehicle.numOfDoors=this.doors;
    this.vehicle.horsepowerHP=this.horsepower;
    this.vehicle.wheelDriveType=this.wheelType;
    fd.append('type',this.selectedValue);
    fd.append('vehicle',JSON.stringify( this.vehicle));

    this.vehicleService.saveVehicle(fd)
      .subscribe(data => {
      this.selectedFile = null;
      this.fileEvent = null;
      this.toastr.success('successfully addition')
    }, (error: HttpErrorResponse) => {
      this.toastr.error('error in save');
    });    this.vehicle = new VehicleDto();
  }

  onSubmit(form:NgForm) {
    this.save();
    form.reset();
    this.selectedValue='categories';
  }

  close() {
    this.showpopup.emit(false);
  }

  ngAfterViewChecked(): void {

  }

}

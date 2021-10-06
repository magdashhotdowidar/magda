import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {VehicleService} from "../../../infrastructure/services/vehicle.service";
import {formatDate} from "@angular/common";
import {ResponseWithDateModel, VehicleDto} from "../../../infrastructure/models/vehicle.models";
import {HttpErrorResponse} from "@angular/common/http";
import {Path} from "../../../../shared/enums/path.enum";
import {LocalStorage} from "../../../../shared/enums/local-storage-coding.enum";

@Component({
  selector: 'vehicle-transaction',
  templateUrl: './vehicle-transaction.component.html',
  styleUrls: ['./vehicle-transaction.component.css']
})
export class VehicleTransactionComponent implements OnInit, AfterViewChecked {
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('plate-num') plateNum: string;
  userName: string = localStorage.getItem(LocalStorage.userName);
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  vehiclesType: string[] = ['sport', 'suv', 'sw', 'transport', 'small', 'car', 'truck', 'select Type'];
  type: string = 'select Type';
  path = Path.vehicleImagePath;
  imageName:string='';
  vehiclesForSearch: VehicleDto[] = [];
  vehiclesByType: VehicleDto[] = [];
  startDate: Date;
  endDate: Date;
  openPrivacy: boolean;
  dorpDownSearchInput: boolean;
  showSearch: boolean;
  showSearchByType: boolean;
  selectDropDown: boolean;
  selectedVehicleName: string = '';
  customer: string='';
  location:string='';
  openLoading: boolean;
  amount: number=0;
  cancellation:ResponseWithDateModel;
  openSearch: boolean;
  showRentLocation: boolean=false;


  constructor(private vehicleService: VehicleService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.setVehicleType();
  }

  setVehicleType() {
    this.vehicleService.getVehicle(this.plateNum).subscribe(data => {
        this.type = data.vehicleType;
        this.imageName=data.imageName;
      },
      (error: HttpErrorResponse) => {
        if (this.type == '') {
        } else alert(error.message)
      })
  }

  bookMe() {
    if(this.setResponse()==null)this.toastr.warning('set the date')
    else this.vehicleService.bookMe(this.setResponse()).subscribe(data => {
        this.toastr.success(data.message);
      },
      (error: HttpErrorResponse) => this.toastr.error(error['error'].message));
  }

  rentMe() {
    if(this.setResponse()==null)this.toastr.warning('set the date')
    else  this.vehicleService.rentMe(this.setResponse()).subscribe(data => {
        this.toastr.success(data.message);
      },
      (error: HttpErrorResponse) => this.toastr.error(error.error.message));
  }
  rentMeAndGiveLocation() {
    if(this.setResponse()==null)this.toastr.warning('set the date')
    else this.vehicleService.rentMeAndGiveLocation(this.setResponse(),this.location).subscribe(data => {
        this.toastr.success(data.message);
        this.showRentLocation=false;
        this.openPrivacy=false;
        this.location='';
      },
      (error: HttpErrorResponse) => this.toastr.error(error['error'].message));
  }

  cancelMe() {
    this.vehicleService.cancelMe(this.plateNum).subscribe(
      (data) => {
        this.cancellation=data.cancellation;
        this.cancellation.label='Cancellation done'
        this.toastr.success(data.message);
      },
      (error: HttpErrorResponse) => this.toastr.warning(error.error.message)
    );
  }

  loadMe() {
    this.openLoading=!this.openLoading;
    this.vehiclesForSearch=[];
    this.showSearch=true;
    this.dorpDownSearchInput=true;
    this.vehicleService.loadMe(this.amount).subscribe(
      (data) => {
        this.vehiclesForSearch=data;
        this.amount=0
      },
      (error: HttpErrorResponse) => this.toastr.success(error.error.message));
  }
  dropMe() {
    this.vehicleService.dropMe(this.plateNum).subscribe(
      (data) => {
        this.cancellation=data.cancellation;
        this.cancellation.label='Returning done'
        this.toastr.success(data.message);
      },
      (error: HttpErrorResponse) => this.toastr.warning(error.error.message)
    );
  }

  handleError(error: HttpErrorResponse) {
    this.toastr.error(error.error.message);
  }

  setResponse(): ResponseWithDateModel {
    if (this.startDate==null||this.endDate==null)return null
    let dateS = formatDate(this.startDate, 'yyyy-MM-dd | hh:mm a', 'en-US');
    let dateE = formatDate(this.endDate, 'yyyy-MM-dd | hh:mm a', 'en-US');
    return new ResponseWithDateModel('',dateS.split('|')[0].trim(), dateE.split('|')[0].trim(),this.plateNum,this.userName,this.customer);
  }

  getVehicleByType() {
    if (this.type != '' || this.type != null || this.type != undefined || this.type.length > 0)
      this.vehicleService.getVehiclesByType(this.type).subscribe(data => {
          this.vehiclesByType = data;
        },
        (error: HttpErrorResponse) => {
          if (this.type == '') {
          } else alert(error.message)
        })
  }

  getVehicleByTypeOrPlateNumber(value: string) {
    this.vehiclesForSearch=[];

    if (value != '' || value != null || value != undefined || value.length > 0)
      this.vehicleService.getVehicleByTypeOrPlateNumber(value).subscribe(
        data => {
          this.vehiclesForSearch = data;
          this.dorpDownSearchInput = true;
        },
        (error: HttpErrorResponse) => {
          if (value == '') {
          } else alert(error.message)
        })
  }

  closeInputDropDown(vehicle: VehicleDto) {
    this.plateNum = vehicle.plateNumber;
    setTimeout(() => {
      this.dorpDownSearchInput = false;
      this.showSearch=false;
    }, 1500);
  }

  closeSelectDropDown(vehicle: VehicleDto) {
    this.selectedVehicleName = vehicle.plateNumber
    this.plateNum = vehicle.plateNumber;
    setTimeout(() => {
      this.selectDropDown = false;
    }, 500);
  }
  setDisabled(type:string):boolean{
    if (type === 'book') if (this.startDate==null||this.endDate==null||this.customer=='')return true;
    if (type === 'cancel') if (this.customer=='')return true;
    if (type === 'amount') if (this.amount<1)return true;
    if (type === 'location') if (this.location==='')return true;
    return false;
  }

  close() {
    this.showpopup.emit(false);
  }

  ngAfterViewChecked(): void {
    this.type = this.type;
  }


}

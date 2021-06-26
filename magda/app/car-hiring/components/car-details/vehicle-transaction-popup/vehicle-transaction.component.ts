import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {VehicleService} from "../../../infrastructure/services/vehicle.service";
import {formatDate} from "@angular/common";
import {ResponseWithDateModel, VehicleDto} from "../../../infrastructure/models/vehicle.models";
import {HttpErrorResponse} from "@angular/common/http";
import {Path} from "../../../../shared/enums/path.enum";

@Component({
  selector: 'vehicle-transaction',
  templateUrl: './vehicle-transaction.component.html',
  styleUrls: ['./vehicle-transaction.component.css']
})
export class VehicleTransactionComponent implements OnInit ,AfterViewChecked{
  @Output('show-popup') showpopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input('plate-num')plateNum:string;
  vehiclesType: string[] = ['sport', 'suv', 'sw', 'transport', 'small', 'car', 'truck','select Type'];
  type:string='select Type';
  path=Path.vehicleImagePath;
  vehiclesForSearch:VehicleDto[]=[];
  vehiclesByType:VehicleDto[]=[];
  vehicleByTyp:VehicleDto;
  startDate: Date;
  endDate:Date;
  openPrivacy: boolean;
  dorpDownSearchInput: boolean;
  showSearch:boolean;
  showSearchByType: boolean;
  selectDropDown: boolean;
  selectedVehicleName: string='';



  constructor(private vehicleService:VehicleService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit() {

  }
  bookMe(){

    this.vehicleService.bookMe(this.getDateFormatted(),this.plateNum).subscribe(
      data=>{this.toastr.success(data.toString())},
      (error:HttpErrorResponse) => this.toastr.error(error.error.message));
  }
  handleError(error: HttpErrorResponse) {
    this.toastr.error(error.error.message);
  }
  getDateFormatted():ResponseWithDateModel{
    let  dateS = formatDate(this.startDate, 'yyyy-MM-dd | hh:mm a', 'en-US');
    let  dateE = formatDate(this.endDate, 'yyyy-MM-dd | hh:mm a', 'en-US');
    return new ResponseWithDateModel(dateS.split('|')[0].trim(),dateE.split('|')[0].trim());
  }
  getVehicleByType() {
    if (this.type != '' || this.type != null || this.type != undefined || this.type.length > 0)
      this.vehicleService.getVehicleByType(this.type).subscribe( data => {
          this.vehiclesByType = data;
        },
        (error: HttpErrorResponse) =>{ if (this.type==''){}else alert(error.message)})
  }
  getVehicleByTypeOrPlateNumber(value: string) {

    if (value != '' || value != null || value != undefined || value.length > 0)
      this.vehicleService.getVehicleByTypeOrPlateNumber(value).subscribe(
        data => {
          this.vehiclesForSearch = data;
          this.dorpDownSearchInput = true;
        },
        (error: HttpErrorResponse) =>{ if (value==''){}else alert(error.message)})
  }

  closeInputDropDown() {
    setTimeout(() => {
      this.dorpDownSearchInput = false;
    }, 500);
  }
  closeSelectDropDown(vehicle:VehicleDto) {
    this.selectedVehicleName=vehicle.plateNumber
    setTimeout(() => {
      this.selectDropDown = false;
    }, 500);
  }

  close() {
    this.showpopup.emit(false);
  }

  ngAfterViewChecked(): void {

  }


}

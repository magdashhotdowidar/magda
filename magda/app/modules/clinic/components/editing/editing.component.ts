import { Component, OnInit } from '@angular/core';
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Path} from "../../../shared/enums/path.enum";
import {AppointmentDto, ClinicResponseDto} from "../../infrastructure/models/clinic.model";
import {ClinicService} from "../../infrastructure/services/clinic.service";
import {formatDate} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'clinic-list-edit',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.css']
})

export class EditingComponent implements OnInit {
  userName = localStorage.getItem(LocalStorage.userName);
  path: typeof Path = Path;
  clinicDevicePath:string=this.path.clinicPath+'docdevice.png';
  clinicDocPath:string=this.path.clinicPath+'doc1.jpg';
  clinicComputerPath:string=this.path.clinicPath+'ddd.jpg';
  selectedItemIndex: number=0;
  objectTypes: boolean[] = [true, false]
  items: number[] = [3,2,1];
  itemsPerPage: number = 3;
  p: number = 1;//initializing the currentPage which is p to 1
  key: string = 'name'; //set default
  reverse: boolean = false;
  date: Date=null;
  appointment: AppointmentDto = new AppointmentDto();
  appointments:AppointmentDto[]=[];

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private clinicService: ClinicService,
              private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getAllAppointmentsToSetDate();
  }

  registerAnAppointment() {
    if (this.date == null || this.appointment.appointmentTime == null) this.toastr.warning('set Date and Time');
    else {
      this.appointment.appointmentDate = formatDate(this.date, 'yyyy-MM-dd', 'en-US');
      this.appointments.splice(this.appointments.indexOf(this.appointment), 1)
      this.clinicService.registerAnAppointment(this.appointment).subscribe((data: ClinicResponseDto) => this.toastr.success('addition successfully done'),
        (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
    }
  }

  getAllAppointmentsToSetDate() {
    this.clinicService.getAllAppointmentsRegisteredOnline().subscribe((date: AppointmentDto[]) => {//this for fetch data form data base
      this.appointments = date;
      if (date)this.appointment=date[date.length-1];
    }, ((error: HttpErrorResponse) => this.toastr.error(error.error.message)));
  }

setAppoint(index:number,appointment :AppointmentDto){
    this.date=null;
    this.selectedItemIndex=index;
    this.appointment=appointment;
}


}


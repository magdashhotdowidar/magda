import {Component, OnInit,} from '@angular/core';
import {formatDate} from "@angular/common";

import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Path} from "../../../shared/enums/path.enum";
import {ToastrService} from "ngx-toastr";
import {ClinicService} from "../../infrastructure/services/clinic.service";
import {NgForm} from "@angular/forms";
import {
  AppointmentDto,
  ClinicResponseDto,
  DoctorDto,
  PatientDto,
  PersonDto
} from "../../infrastructure/models/clinic.model";
import {DoctorAndPatientService} from "../../infrastructure/services/doctor-patient.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'register-appointment',
  templateUrl: './register-appointment.component.html',
  styleUrls: ['./register-appointment.component.css']
})
export class RegisterAppointmentComponent implements OnInit {
  //date: string = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
  date:Date;
  userName: string = localStorage.getItem(LocalStorage.userName);
  role: string = localStorage.getItem(LocalStorage.role);
  userImagePath: string = Path.userImagePath;
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  l: typeof LocalStorage = LocalStorage;
  doctorsForSearch: DoctorDto[] = [];
  patientsForSearch: PatientDto[] = [];
  openDoctorsDropDown: boolean = false;
  openPatientsDropDown: boolean = false;
  objectTypes: boolean[] = [true, false]
  appointment: AppointmentDto = new AppointmentDto();

  constructor(private title: Title,
              private toastr: ToastrService,
              private clinicService: ClinicService,
              private DPService: DoctorAndPatientService) {
  }

  ngOnInit() {
    this.title.setTitle('CLINIC-Register an Appointment')
  }

  registerAnAppointment() {
    if(this.date) this.appointment.appointmentDate=formatDate(this.date, 'yyyy-MM-dd', 'en-US');
    this.appointment.registrationDate=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.clinicService.registerAnAppointment(this.appointment).subscribe((data: ClinicResponseDto) => this.toastr.success('addition successfully done'),
      (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
  }

  onSubmit(form: NgForm) {
    this.registerAnAppointment();
    form.reset();
  }

  getPersonByNames(getFor: string, value: string) {
    this.doctorsForSearch = [];
    this.patientsForSearch = [];

    if (value == '' || value == null || value == undefined || value.length == 0) this.toastr.warning('enter value for searching');
    else {
      if (getFor.match('doctor')) this.DPService.getDoctorByNames(value).subscribe(
        data => {
          this.doctorsForSearch = data;
          this.openDoctorsDropDown = true;
        }, (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
      else this.DPService.getPatientByNames(value).subscribe(
        data => {
          this.patientsForSearch = data;
          this.openPatientsDropDown = true;
        }, (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
    }
  }

  closeInputDropDown(closeFor: string, person: PersonDto) {
    if (closeFor.match('doctor')) this.appointment.doctor = person.firstName + ' ' + person.lastName;
    else this.appointment.patient = person.firstName + ' ' + person.lastName;
    setTimeout(() => {
      this.openDoctorsDropDown = false;
      this.openPatientsDropDown = false;
    }, 1000);
  }


}



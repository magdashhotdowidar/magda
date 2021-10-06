import {Component, OnInit,} from '@angular/core';
import {formatDate} from "@angular/common";

import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {Path} from "../../../shared/enums/path.enum";
import {ToastrService} from "ngx-toastr";
import {ClinicService} from "../../infrastructure/services/clinic.service";
import {
  AppointmentDto,
  ClinicResponseDto,
  DoctorDto,
  PatientDto,
  PersonDto
} from "../../infrastructure/models/clinic.model";
import {HttpErrorResponse} from "@angular/common/http";
import {DoctorAndPatientService} from "../../infrastructure/services/doctor-patient.service";


@Component({
  selector: 'search-appointment',
  templateUrl: './search-appointment.component.html',
  styleUrls: ['./search-appointment.component.css']
})
export class SearchAppointmentComponent implements OnInit {
  //date: string = formatDate(new Date(), 'yyyy-MM-dd | hh:mm:ss', 'en-US');
  date: Date=new Date();
  userName: string = localStorage.getItem(LocalStorage.userName);
  role: string = localStorage.getItem(LocalStorage.role);
  userImagePath: string = Path.userImagePath;
  userImage: string = localStorage.getItem(LocalStorage.userImage);
  l: typeof LocalStorage = LocalStorage;
  appointments: AppointmentDto[] = [];
  patientsForSearch: PatientDto[] = [];
  doctorsForSearch: DoctorDto[] = [];
  openPatientsDropDown: boolean = false;
  showSDI: boolean = false;
  showSPI: boolean = false;
  searchByPatient: string = '';
  searchByDate: string = '';
  searchByReason: string = '';
  items: number[] = [1, 5, 10, 15, 20, 50];
  itemsPerPage: number = 5;
  p: number = 1;//initializing the currentPage which is p to 1
  key: string = 'name'; //set default
  reverse: boolean = false;
  moreOptions: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  constructor(private title: Title,
              private toastr: ToastrService,
              private clinicService: ClinicService,
              private DPService: DoctorAndPatientService) {
  }

  ngOnInit() {
    this.title.setTitle('CLINIC-SEARCH APPOINTMENT')
    this.getAllAppointmentsHistory();
  }

  getAllAppointmentsHistory() {
    this.reSetData();
    this.clinicService.getAllAppointmentsHistory().subscribe((date: AppointmentDto[]) => {
      this.appointments = date;
    }, ((error: HttpErrorResponse) => this.toastr.error(error.error.message)));
  }

  getAllAppointmentsToday() {
    this.reSetData();
    this.date = new Date();
    this.searchByDate = formatDate(this.date, 'yyyy-MM-dd', 'en-US');//this for fetch data by appointmentsFilter
    this.clinicService.getAllAppointmentsToday().subscribe((date: AppointmentDto[]) => {//this for fetch data form data base
      this.appointments = date;
    }, ((error: HttpErrorResponse) => this.toastr.error(error.error.message)));
  }

  reSetData() {
    this.appointments = [];
    this.showSPI = false;
    this.showSDI = false;
    this.searchByDate = '';
    this.searchByPatient = '';
  }

  getAllAppointmentsByDate() {
    this.appointments = [];
    this.searchByDate = formatDate(this.date, 'yyyy-MM-dd', 'en-US');//this for fetch data by appointmentsFilter
     this.clinicService.getAllAppointmentsByDate(formatDate(this.searchByDate, 'yyyy-MM-dd', 'en-US')).subscribe((date: AppointmentDto[]) => {
       this.appointments = date;
     }, ((error: HttpErrorResponse) => this.toastr.error(error.error.message)));
  }

  getAllAppointmentsByPatient() {
    this.appointments = [];
    this.clinicService.getAllAppointmentsByPatient(this.searchByPatient).subscribe((date: ClinicResponseDto) => {
      this.appointments = date.appointments;
    }, ((error: HttpErrorResponse) => this.toastr.error(error.error.message)));
  }

  cancelAppointment(a: AppointmentDto) {
    this.clinicService.cancelAnAppointment(a.patient, a.appointmentDate).subscribe((data) => {
        this.getAllAppointmentsHistory();
        this.toastr.success(data.message)
      }
      , ((error: HttpErrorResponse) => this.toastr.error(error.error.message)))
  }

  appointmentAsIcon(a: AppointmentDto) {

  }

  updateAppointment(a: AppointmentDto) {
      this.clinicService.registerAnAppointment(a).subscribe((data: ClinicResponseDto) => this.toastr.success('addition successfully done'),
        (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
    }

  getPersonByNames(value: string) {
    this.patientsForSearch = [];
    if (value == '' || value == null || value == undefined || value.length == 0) this.toastr.warning('enter value for searching');
    else {
      this.DPService.getPatientByNames(value).subscribe(
        data => {
          this.patientsForSearch = data;
          this.openPatientsDropDown = true;
        }, (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
    }
  }

  closeInputDropDown(closeFor: string, person: PersonDto) {
    this.searchByPatient = person.firstName + ' ' + person.lastName;
    setTimeout(() => {
      this.openPatientsDropDown = false;
    }, 1000);
  }
}



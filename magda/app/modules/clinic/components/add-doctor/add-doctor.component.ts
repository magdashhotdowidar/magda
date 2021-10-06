import {Component, OnInit,} from '@angular/core';

import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {ToastrService} from "ngx-toastr";
import {ClinicService} from "../../infrastructure/services/clinic.service";
import {NgForm} from "@angular/forms";
import {ClinicResponseDto, DoctorDto, PersonDto} from "../../infrastructure/models/clinic.model";
import {DoctorAndPatientService} from "../../infrastructure/services/doctor-patient.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'add-doctor-patient',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  //if error message un showed -> set the response type as object not string and don't caste catch block use if and throw
  userName: string = localStorage.getItem(LocalStorage.userName);
  doctorsForSearch:DoctorDto[]=[];
  openDoctorsDropDown:boolean=false;
  objectTypes: string[] = ['doctor', 'patient']
  person:PersonDto=new PersonDto();

  constructor(private title: Title,
              private toastr: ToastrService,
              private clinicService: ClinicService,
              private DPService: DoctorAndPatientService) {
  }

  ngOnInit() {
    this.title.setTitle('CLINIC-ADD DOCTOR')
    this.person.objectType='doctor';
  }

  addDOrP() {
    this.DPService.addPerson(this.person).subscribe((data:ClinicResponseDto)=>this.toastr.success('addition successfully done'),
      (error:HttpErrorResponse)=>this.toastr.warning(error.error.message));
  }

  onSubmit(form: NgForm) {
    this.addDOrP();
    form.reset();
  }

  getDoctorByNames(value: string) {
    this.doctorsForSearch=[];

    if  (value == '' || value == null || value == undefined || value.length == 0) this.toastr.warning('enter value for searching');
    else {
      this.DPService.getDoctorByNames(value).subscribe(
        data => {
          this.doctorsForSearch = data;
          this.openDoctorsDropDown = true;
        },
        (error: HttpErrorResponse) => this.toastr.warning(error.error.message));
    }
  }

  closeInputDropDown(doctor:DoctorDto) {
    this.person.doctor=doctor.firstName +' '+ doctor.lastName;
    setTimeout(() => {
      this.openDoctorsDropDown = false;
    }, 1000);
  }

}



import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {ToastrService} from "ngx-toastr";
import {ClinicService} from "../../infrastructure/services/clinic.service";
import {Path} from "../../../shared/enums/path.enum";
import {NgForm} from "@angular/forms";
import {AlertInput} from "../../../shared/alerts/alert-input";

@Component({
  selector: 'clinic-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {
  userName = localStorage.getItem(LocalStorage.userName);
  path: typeof Path = Path;
  clinicDevicePath:string=this.path.clinicPath+'docdevice.png';
  clinicDocPath:string=this.path.clinicPath+'doc1.jpg';
  clinicComputerPath:string=this.path.clinicPath+'ddd.jpg';
  managing:boolean=true;
  managingTyp:string='add Doctor Or Patient';
  alertInput: AlertInput;


  constructor(private title: Title,
              private toastr:ToastrService,
              private clinicService:ClinicService) {
  }

  ngOnInit() {
    this.title.setTitle(this.userName + ' - CLINIC')
    this.alertInput=new AlertInput('w','سم الله');
    this.clinicService.setComponent.subscribe(data=>{this.managingTyp=data.option;this.managing=data.showPic})
  }

}


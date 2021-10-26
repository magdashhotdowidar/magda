
import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {Path} from "../../../shared/enums/path.enum";
import {LocalStorage} from "../../../shared/enums/local-storage-coding.enum";
import {VehicleDto} from "../../infrastructure/models/vehicle.models";
import {VehicleService} from "../../infrastructure/services/vehicle.service";


@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
//test comment
  plateNum: string;
  vehicle: any;
  user = localStorage.getItem(LocalStorage.userName);
  l:typeof LocalStorage=LocalStorage;
  role=localStorage.getItem(LocalStorage.role);
  path: typeof Path = Path;
  imgPath: string = this.path.vehicleImagePath;
  showTransacPopup: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private vehicleService:VehicleService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.vehicle = new VehicleDto();

    this.plateNum = this.route.snapshot.params['num'];

    this.vehicleService.getVehicle(this.plateNum).subscribe(data => {
        this.vehicle = data;
      }, error => this.toastr.error('error in get vehicle'));
  }

  list() {
    this.router.navigate(['../../manage'], {relativeTo: this.route});
  }


}

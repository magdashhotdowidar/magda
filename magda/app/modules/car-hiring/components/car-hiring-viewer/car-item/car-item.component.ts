import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VehicleDto} from "../../../infrastructure/models/vehicle.models";
import {Path} from "../../../../shared/enums/path.enum";

@Component({
  selector: 'car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  path: typeof Path = Path;
  imgPath: string = this.path.vehicleImagePath;
  @Input() vehicle:VehicleDto=new VehicleDto();

  constructor(  private router: Router,
                private route: ActivatedRoute) { }

  ngOnInit() {
  }

  vehicleDetails(num: string) {
    if (this.router.url.split('/').length==5)
   this.router.navigate(['../v_details', num], {relativeTo: this.route});
    else this.router.navigate(['v_details', num], {relativeTo: this.route});
  }


}

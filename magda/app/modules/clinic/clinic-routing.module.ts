import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClinicHomeComponent} from "./core/clinic-home/clinic-home.component";
import {ReceptionComponent} from "./components/reception/reception.component";
import {AddDoctorComponent} from "./components/add-doctor/add-doctor.component";
import {DialogComponent} from "./components/dialog/dialog.component";
import {EditingComponent} from "./components/editing/editing.component";

const routes: Routes = [
  {
    path: '', component: ClinicHomeComponent, children: [
      {path: '', component: ReceptionComponent},
      {path:'addDP',component:AddDoctorComponent},
      {path:'dialog',component:DialogComponent},
      {path:'editing',component:EditingComponent}
        ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClinicRoutingModule {
}

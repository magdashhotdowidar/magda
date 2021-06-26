import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CarHiringHomeComponent} from "./core/car-hiring-home/car-hiring-home.component";
import {CarHiringViewerComponent} from "./components/car-hiring-viewer/car-hiring-viewer.component";
import {AuthGuard} from "../auth/auth.guard";
import {AuthorizeGuard} from "../auth/authorize.guard";
import {LocalStorage} from "../shared/enums/local-storage-coding.enum";
import {CarManagementComponent} from "./components/car-management/car-management.component";
import {CarDetailsComponent} from "./components/car-details/car-details.component";


const routes: Routes = [
  {
    path: '', component: CarHiringHomeComponent, children: [
      {path: '', component: CarHiringViewerComponent},
      {
        path: 'manage', component: CarManagementComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN]}
      },
      {
        path: 'v_details/:num', component: CarDetailsComponent,
        canActivate: [AuthGuard, AuthorizeGuard],
        data: {OiIyMDIxLTAxLTA: [LocalStorage.ROLE_ADMIN, LocalStorage.ROLE_USER]}
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarHiringRoutingModule {
}

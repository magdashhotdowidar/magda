import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {TutorialHomeComponent} from "./core/tutorial-home/tutorial-home.component";
import {TabComponent} from "./components/tab/tab.component";
import {AuthGuard} from "../auth/auth.guard";
import {SideBarPopupComponent} from "./components/side-bar/side-bar-popup/side-bar-popup.component";
import {TabPopupComponent} from "./components/tab/tab-popup/tab-popup.component";


const routes: Routes = [
  {
    path: '', component: TutorialHomeComponent, children: [
      {path: '', component: SideBarComponent,children:[
          {path: '', component: SideBarPopupComponent}
        ]},
      {path: 'sideBar/:tabTitle', component: SideBarComponent,children:[
          {path: '', component: SideBarPopupComponent},
        {path: 'sideBarPopup/:tabTitle/:linkLabel', component: SideBarPopupComponent}
          ]}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TutorialRoutingModule {
}

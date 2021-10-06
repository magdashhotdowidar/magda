import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {TutorialHomeComponent} from "./core/tutorial-home/tutorial-home.component";
import {SideBarPopupComponent} from "./components/side-bar/side-bar-popup/side-bar-popup.component";
import {VideoComponent} from "./components/video/video.component";
import {WatchComponent} from "./components/video/watch/watch.component";


const routes: Routes = [
  {
    path: '', component: TutorialHomeComponent, children: [
      {path: '', component: SideBarComponent,children:[
          {path: '', component: SideBarPopupComponent}
        ]},
      {path: 'sideBar/:tabTitle', component: SideBarComponent,children:[
          {path: '', component: SideBarPopupComponent},
        {path: 'sideBarPopup/:tabTitle/:linkLabel', component: SideBarPopupComponent}
          ]},
      {path:'video',children:[
          {path:'',component:VideoComponent},
          {path:'watch',component: WatchComponent}
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

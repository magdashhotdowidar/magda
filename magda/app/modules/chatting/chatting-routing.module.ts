import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {ChattingHomeComponent} from "./core/chatting-home/chatting-home.component";
import {PersonalPageComponent} from "./components/personal-page/personal-page.component";
import {ChattingUserComponent} from "./chatting-user/chatting-user.component";
import {ChattingSignInComponent} from "./chatting-user/chatting-sign-in/chatting-sign-in.component";
import {ChattingSignUpComponent} from "./chatting-user/chatting-sign-up/chatting-sign-up.component";
import {AuthGuard} from "../auth/auth.guard";


const routes: Routes = [
  {path: '', redirectTo: 'chattinglogin'},
  {
    path: 'chattinghome', component: ChattingHomeComponent,canActivateChild:[AuthGuard], children: [
      {path: 'mainPage', component: MainPageComponent},
      {path: 'personalPage/:id', component: PersonalPageComponent,canActivate:[AuthGuard]}
    ]
  },
  {path: 'chattinglogin', component: ChattingUserComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChattingRoutingModule {
}

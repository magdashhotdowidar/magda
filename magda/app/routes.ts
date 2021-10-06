import {Routes} from '@angular/router'
import {FrontHomeComponent} from './modules/core/front-home/front-home.component';
import {UserComponent} from './modules/user/user.component';
import {SignUpComponent} from './modules/user/sign-up/sign-up.component';
import {na, SignInComponent} from './modules/user/sign-in/sign-in.component';
import {AuthGuard} from "./modules/auth/auth.guard";
import {Coding} from "./modules/shared/enums/coding.enum";
import {BuildByramidComponent} from "./modules/core/games/build-byramid/build-byramid.component";
import {TestChatComponent} from "./modules/core/games/test-chat/test-chat.component";



export const appRoutes: Routes = [
  {
    path: na,canActivateChild:[AuthGuard], children: [
      {path: '', component: FrontHomeComponent},
      {path: Coding.front_home,component:FrontHomeComponent},
      {path:Coding.pyramid,component: BuildByramidComponent},
      {path:Coding.test_chat,component: TestChatComponent},
      {path: Coding.product, loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)},
      {path: Coding.tutorial, loadChildren: () => import('./modules/tutorial/Tutorial.module').then(m => m.TutorialModule)},
      {path: Coding.car_hiring, loadChildren: () => import('./modules/car-hiring/car-hiring.module').then(m => m.CarHiringModule)},
      {path: Coding.clinic, loadChildren: () => import('./modules/clinic/clinic.module').then(m => m.ClinicModule)},
      {path: Coding.chatting, loadChildren: () => import('./modules/chatting/chatting.module').then(m => m.ChattingModule)}
    ]
  }
  ,
  {
    path: 'signup', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
  },
  {
    path: 'login', component: UserComponent,
    children: [{path: '', component: SignInComponent}]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},

];

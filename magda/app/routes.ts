import {Routes} from '@angular/router'
import {FrontHomeComponent} from './core/front-home/front-home.component';
import {UserComponent} from './user/user.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {na, SignInComponent} from './user/sign-in/sign-in.component';
import {AuthGuard} from "./auth/auth.guard";
import {Coding} from "./shared/enums/coding.enum";
import {BuildByramidComponent} from "./core/games/build-byramid/build-byramid.component";
import {TestChatComponent} from "./core/games/test-chat/test-chat.component";



export const appRoutes: Routes = [
  {
    path: na,canActivateChild:[AuthGuard], children: [
      {path: '', component: FrontHomeComponent},
      {path: Coding.front_home,component:FrontHomeComponent},
      {path:Coding.pyramid,component: BuildByramidComponent},
      {path:Coding.test_chat,component: TestChatComponent},
      {path: Coding.product, loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
      {path: Coding.chatting, loadChildren: () => import('./chatting/chatting.module').then(m => m.ChattingModule)}
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

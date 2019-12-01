import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { UserListComponent } from './modules/user/components/user-list/user-list.component';
import { DisplayUserComponent } from './modules/user/components/display-user/display-user.component';
import { UsersComponent } from './modules/user/components/users/users.component';
import { UserComponent } from './modules/user/components/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'auth',
    loadChildren: 'src/app/modules/auth/auth.module#AuthModule',
    canActivate: [LoginGuard]
  },
  {
    path: 'users',
    loadChildren: 'src/app/modules/user/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'users',
  //   component: UserListComponent
  // },
  // {
  //   path: 'user/:id',
  //   component: DisplayUserComponent
  // },
  // {
  //   path: 'userstest',
  //   component: UsersComponent,
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'usertest/:id',
  //   component: UserComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component: NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard]
})
export class AppRoutingModule { }

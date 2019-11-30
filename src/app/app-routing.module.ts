import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { UserListComponent } from './modules/user/components/user-list/user-list.component';
import { DisplayUserComponent } from './modules/user/components/display-user/display-user.component';
import { UsersComponent } from './modules/user/components/users/users.component';
import { UserComponent } from './modules/user/components/user/user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'userstest'
  },
  // {
  //   path: 'user',
  //   loadChildren: 'src/app/modules/user/user.module#UserModule',
  // },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'user/:id',
    component: DisplayUserComponent
  },
  {
    path: 'userstest',
    component: UsersComponent
  },
  {
    path: 'usertest/:id',
    component: UserComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { UserCenterComponent } from './components/user-center/user-center.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    pathMatch: 'full'
  },

  {path: 'display-user/:id',
  pathMatch: 'full',
  component: DisplayUserComponent
  }

  // {
  //   path: 'user-center',
  //   component: UserCenterComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: UserListComponent,
  //       children: [
  //         {path: 'display-user/:id',
  //         pathMatch: 'full',
  //         component: DisplayUserComponent
  //         }
  //       ]
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

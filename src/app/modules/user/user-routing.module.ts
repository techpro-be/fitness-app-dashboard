import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { LayoutComponent } from 'src/app/shared/components/layout/layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: LayoutComponent,
  //   children: [
      {
        path: 'user-list',
        component: UserListComponent,
        pathMatch: 'full'
      },
      {path: 'display-user/:id',
      pathMatch: 'full',
      component: DisplayUserComponent
      }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

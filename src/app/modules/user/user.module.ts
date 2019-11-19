import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UserCenterComponent } from './components/user-center/user-center.component';

@NgModule({
  declarations: [
    UserListComponent,
    DisplayUserComponent,
    UserCenterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    UserListComponent,
    DisplayUserComponent,
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  providers: []
})
export class UserModule { }

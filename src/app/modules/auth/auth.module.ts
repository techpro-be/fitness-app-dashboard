import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth-routing.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {}

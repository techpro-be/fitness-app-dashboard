import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/modules/shared.module';
import { AngularFirestoreModule, AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { WelcomeComponent } from './modules/welcome/welcome.component';
import { AuthService } from './modules/auth/auth.service';
import { UIService } from './shared/ui.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { AuthModule } from './modules/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    SharedModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, UIService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

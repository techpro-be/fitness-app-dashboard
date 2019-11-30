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


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent

  ],
  imports: [
    BrowserModule,
    UserModule,
    SharedModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

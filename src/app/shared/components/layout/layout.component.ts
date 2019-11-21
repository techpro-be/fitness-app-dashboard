import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  isAuth = false;
  subscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.subscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseToken: string;
  uid: string;
  user: Observable<IUser>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFirestore
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        } else {
          return null;
        }
      })
    );
  }


  currentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .onAuthStateChanged(user => {
          if (user) {
            // console.log('User', user);
            resolve(user);
          } else {
            reject('Not authenticated!');
          }
        }, err => reject(err)
        );
    });

  }

  onRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          (res: any) => {
            this.firebaseToken = res.user.ra;
            resolve(res);
          }, err => reject(err));
    });
  }

  onLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (res: any) => {
            // console.log("response", res)
            // this.firebaseToken = res.user.ra;
            // this.db.collection('users').add({
            //   uid: res.user.uid,
            //   photoURL: res.user.photoURL,
            //   displayName: res.user.displayName,
            //   token: res.user.ra,
            // }),
              resolve(res);
          },
          err => reject(err)
        );
    });
  }

  googleSignIn() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth.signInWithPopup(provider)
        .then(
          (response: any) => {
            this.db.collection('users').add({
              uid: response.user.uid,
              photo: response.user.photoURL,
              name: response.user.displayName,
              token: response.user.ra,
            }),
              resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  onResetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.sendPasswordResetEmail(email)
        .then(
          (res: any) => {
            resolve(res);
          },
          err => {
            reject(err);
          },
        );
    });
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}

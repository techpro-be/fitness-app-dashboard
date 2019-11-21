import {Subject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Resume } from 'src/app/shared/resume.module';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  resumeCollection: AngularFirestoreCollection<Resume>;
  resumes: Observable<any>;
  resumeDoc: AngularFirestoreDocument<Resume>;
  constructor( private afs: AngularFirestore) {}

  getCurrentUser() {

    return new Promise<any>((resolve, reject) => {
      const user: any = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }


  deleteUser(resume: Resume) {
    return this.resumeDoc = this.afs.doc('cvForm/${id}');
    this.resumeDoc.delete();
  }

  getObjectById(id) {
    return this.afs.collection('cvForm').doc(id).valueChanges();
  }

  getUsers() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/cvForm').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      });
    });
  }

}

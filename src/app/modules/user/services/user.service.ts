import {Subject, Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Resume } from 'src/app/shared/resume.module';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  resumeCollection: AngularFirestoreCollection<Resume>;
  resumes: Observable<any>;
  resumeDoc: AngularFirestoreDocument<Resume>;
  constructor( private afs: AngularFirestore) {}


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

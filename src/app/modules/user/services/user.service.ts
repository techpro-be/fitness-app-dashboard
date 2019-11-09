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

  resumeDoc: AngularFirestoreDocument<Resume>;
  resumeCollection: AngularFirestoreCollection<Resume>;
  resumes: Observable<any>;
  constructor( private afs: AngularFirestore) {}


  deleteUser(resume: Resume) {
    return this.resumeDoc = this.afs.doc('cvForm/${id}');
    this.resumeDoc.delete();
  }

  getObjectById(id) {
    return this.afs.collection('cvForm').doc(id).valueChanges();
  }

}

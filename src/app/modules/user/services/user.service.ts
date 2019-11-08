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
  resumes: Observable<Resume[]>;
  constructor( private afs: AngularFirestore) {

    this.resumeCollection = this.afs.collection('Resume' , ref => ref.orderBy('name', 'asc'));
      // this.resumes = this.resumeCollection.valueChanges();
      this.resumes = this.resumeCollection
       .snapshotChanges()
       .pipe(map(response => {
         return response.map(cvdata => {
           const data = cvdata.payload.doc.data() as Resume;
           console.log('Data', data);
           return data;
         });
       }));

   }

  deleteUser(resume: Resume) {
    return this.resumeDoc = this.afs.doc('cvForm/${resume.id}');
    this.resumeDoc.delete();
  }
}

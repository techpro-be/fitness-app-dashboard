import { Injectable } from '@angular/core';
import { Resume } from 'src/app/shared/resume.module';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

testDoc: AngularFirestoreDocument<Resume>;
tests$: Observable<Resume[]>;
testid: string;


  constructor(private userService: UserService,
              private afs: AngularFirestore) {

      this.tests$ = this.afs.collection<Resume>('testCv')
     .snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const testdata = a.payload.doc.data() as Resume;
         const testid = a.payload.doc.id;
         return { testid, ...testdata };
       }))
     );
               }


  deleteUser(test: Resume) {
  this.testDoc = this.afs.doc(`testCv/${this.testid}`);
  this.testDoc.delete();
  }
}

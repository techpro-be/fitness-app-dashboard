import {Subject} from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { cvForm } from 'src/app/shared/cvform.module';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  cvFormChanged = new Subject <cvForm>();
  cvFormsChanged = new Subject <cvForm[]>();
  finishedcvFormsChanged = new Subject <cvForm[]>();

  private availablecvForms: cvForm[] = [];
  private runningcvForm: cvForm;
  private fbSubs: Subscription[] = [];

  constructor( private db: AngularFirestore) { }

  // fetchAvailablecvForms() {
  //    this.fbSubs.push(this.db
  //     .collection('availablecvForms')  // select the connection of db
  //     .snapshotChanges()  // name of the observable
  //     .map( docArray => {
  //         return docArray.map(doc => {
  //             return {
  //             firstName: doc.payload.doc.firstName,   // return this object stored in doc, which is stored in docArray
  //             name: doc.payload.doc.data().name,
  //             duration: doc.payload.doc.data().duration,
  //             calories: doc.payload.doc.data().calories
  //             };
  //         });
  //     })
  //     .subscribe( (cvForms: cvForm[]) => {

  //         this.availablecvForms = cvForms;
  //         this.cvFormsChanged.next([...this.availablecvForms]);
  //     }));
  // }

  // startcvForm(selectedId: string) {
  //     this.runningcvForm = this.availablecvForms.find( ex => ex.id === selectedId
  //          );  // return true if object cvForm is found

  //     this.cvFormChanged.next({ ...this.runningcvForm}); // return the same properties as ex object
  // }

  // completecvForm() {
  //     this.addDataToDatabase({
  //         ...this.runningcvForm,
  //         date: new Date,
  //         state: 'completed'
  //     });

  //     this.runningcvForm = null;
  //     this.cvFormChanged.next(null);
  // }

  // cancelcvForm(progress: number) {
  //     this.addDataToDatabase({
  //         ...this.runningcvForm,
  //         duration: this.runningcvForm.duration * (progress / 100 ),
  //         calories: this.runningcvForm.calories * (progress / 100 ),
  //         date: new Date,
  //         state: 'canceled'
  //     });

  //     this.runningcvForm = null;
  //     this.cvFormChanged.next(null);
  //     }

  getRunningcvForm() {
          return {...this.runningcvForm};
  }

  fetchCompletedOrCancelledcvForms() {
      this.fbSubs.push(this.db
      .collection('finishedcvForms')
      .valueChanges()
      .subscribe((cvForms: cvForm[]) => {
          this.finishedcvFormsChanged.next(cvForms);
      }));
  }

  cancelSubscription() {
      this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  // private addDataToDatabase(cvForm: cvForm) {
  //         this.db.collection('finishedcvForms').add(cvForm);  // stores the finished/canceled cvForm to database
  // }

}

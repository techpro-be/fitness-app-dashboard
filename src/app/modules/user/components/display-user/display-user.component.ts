import { Component, OnInit, Output } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { cvForm } from 'src/app/shared/cvform.module';


@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {

  private resumeCollection: AngularFirestoreCollection<cvForm>;
  resumes: Observable<any>;

  constructor(
   private userService: UserService,
   public afs: AngularFirestore
   ) {
     // this.resumeCollection = afs.collection<cvForm>('cvForm');
     // this.resumes = this.resumeCollection.valueChanges();

     // this.resumes = this.afs.collection('cvForm')
     //  .snapshotChanges()
     //  .pipe(map(response => {
     //    return response.map(cvdata => {
     //      const resume = cvdata.payload.doc.data() as cvForm;
     //      console.log('Data', resume);
     //      return resume;
     //    });
     //  }));
    }

  ngOnInit() {

  }

}

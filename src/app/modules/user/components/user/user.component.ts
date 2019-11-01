import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  forms: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.forms = db.collection('cvForm').valueChanges();
  }

  ngOnInit() {
  }

}

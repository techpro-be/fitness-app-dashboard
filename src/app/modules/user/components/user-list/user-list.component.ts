import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  forms: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.forms = db.collection('cvForm').valueChanges();
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { Test } from 'src/app/shared/models/test.model';
import { Resume } from 'src/app/shared/models/resume.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  resume$: Observable<Resume>;   // Observable of type Resume  id: String;   // will hold id passed through route (:id)
  id: any;

  showEditForm: Boolean = false;
  showForm: Boolean = false;

  newUser:  Test ={
    review: "",
  }

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // set 'id' when page loads from route params.id
    this.route.params.subscribe(params => this.id = params.id)
  }
  ngOnInit() {
    // query Firestore using 'id' when page loads
    this.resume$ = this.db
        .doc<Resume>('cvForm/' + this.id)
        .valueChanges();
  }
  onEditFormSubmit() {
    console.log(this.newUser);
    this.db.doc('cvForm/' + this.id).update(this.newUser);
    this.showEditForm = false;
  }
  onSubmit() {
    console.log(this.newUser);
    this.db.collection<Test>('cvForm').add(this.newUser);  //adds new user into db
    this.showForm = false;
  }
  onCancel() {
    this.showEditForm = false;
  }

  confirmDelete() {
    const answer = prompt('Are you sure you want to delete this user (yes or no)');
    if(answer === "yes") {
    this.db.doc('cvForm/' + this.id).delete();
    this.router.navigate(['/userstest']);
  }
}
}

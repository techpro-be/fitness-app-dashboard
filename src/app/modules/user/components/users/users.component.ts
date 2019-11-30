import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Resume } from 'src/app/shared/models/resume.model';
import { Test } from 'src/app/shared/models/test.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Observable which will hold an array of Resume
  resumes$: Observable<Resume[]>;

  // form boolean
  showForm: Boolean = false;

  // default Resume values
  newUser:  Test ={
    name: "",
    surname: "",
    personalBackground: "",
  }

  //variables needed for table
  dataSource = new MatTableDataSource<Resume>();
  sort: MatSort;
  paginator: MatPaginator;
  headElements = ['name', 'surname', 'phone', 'email', 'position', 'actions'];

 constructor(private db: AngularFirestore,) {
    this.resumes$ = this.db.collection<Resume>('cvForm')
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Resume;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  ngOnInit() {
    this.resumes$.subscribe((data: Resume[]) => {
    this.dataSource.data = data;  //save data that comes from db into dataSource, needed for table
    });
  }

  doFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();  //filter for every datasource
  }

  onSubmit() {
    console.log(this.newUser);
    this.db.collection<Test>('cvForm').add(this.newUser);  //adds new user into db
    this.showForm = false;
  }

  onDeleteForm(){
    console.log("delete button works");
  }
 }

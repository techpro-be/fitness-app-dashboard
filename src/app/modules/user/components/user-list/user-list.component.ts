import { Component, OnInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { Resume } from 'src/app/shared/resume.module';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  // headElements = ['ID', 'First', 'Last', 'Handle'];
  headElements = ['name', 'surname', 'phone', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<Resume>();
  sort: MatSort;
  paginator: MatPaginator;

  resumeCollection: AngularFirestoreCollection<Resume>;
  resumes$: Observable<Resume[]>;
  id: string;

  constructor(
    private userService: UserService,
    public afs: AngularFirestore,
    private router: Router
    ) {
      this.resumes$ = this.afs.collection<Resume>('cvForm')
     .snapshotChanges().pipe(
       map(actions => actions.map(a => {
         const data = a.payload.doc.data() as Resume;
         const id = a.payload.doc.id;
         return { id, ...data };
       }))
     );
    }

  ngOnInit() {
    this.resumes$.subscribe();
  }



  onDeleteForm(id) {
    this.userService.deleteUser(id);
  }

}





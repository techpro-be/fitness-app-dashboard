import { Component, OnInit, AfterViewInit} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { Resume } from 'src/app/shared/resume.module';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  id: any;
  resumeDoc: AngularFirestoreDocument<Resume>;
  resumeCollection: AngularFirestoreCollection<Resume>;
  resumes: any = [];

  displayedColumns = ['name', 'surname', 'phone', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<Resume>();
  sort: MatSort;
  paginator: MatPaginator;

  constructor(
    private userService: UserService,
    public afs: AngularFirestore
    ) {}

  ngOnInit() {

    this.resumeCollection = this.afs.collection('cvForm' , ref => ref.orderBy('name', 'asc'));
    this.resumes = this.resumeCollection
       .snapshotChanges()
       .pipe(map(response => {
         return response.map(cvdata => {
           const data = cvdata.payload.doc.data() as Resume;
           this.id = cvdata.payload.doc.id;
           return data;
         });
       }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDeleteForm(id) {
    this.userService.deleteUser(id);
  }


}





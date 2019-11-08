import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { cvForm } from 'src/app/shared/cvform.module';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  forms: Observable<any>;

  displayedColumns = ['name', 'surname', 'phone', 'email', 'address', 'actions'];
  dataSource = new MatTableDataSource<cvForm>();
  sort: MatSort;
  paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    public afs: AngularFirestore
    ) {
      this.forms = afs.collection('cvForm').valueChanges();
     }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();  // filter property makes as the work
  }

  onDelete() {
    this.userService.deleteUser(this.forms)
    .then(
      res => {
        this.snackBar.open('CV was deleted successfully ', null, {
          duration: 3000
        });
      },
      err => {
        console.log(err);
      }
    );
  }

   public captureScreen() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
}





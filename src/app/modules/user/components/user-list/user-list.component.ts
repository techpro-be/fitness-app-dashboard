import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { UserService } from '../../services/user.service';
import { cvForm } from 'src/app/shared/cvform.module';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {

  forms: Observable<any[]>;
  private exChangedSubscription: Subscription;
  displayedColumns = ['name', 'surname', 'age', 'phone', 'email', 'address'];
  dataSource = new MatTableDataSource<cvForm>();
  sort: MatSort;
  paginator: MatPaginator; // matsort -> the name in html component

  constructor(
    private userService: UserService,
    db: AngularFirestore
    ) {
      this.forms = db.collection('cvForm').valueChanges();
    }  // because we have our data in UserService

  ngOnInit() {
    //  this.exChangedSubscription = this.userService.finishedcvFormsChanged.subscribe(
    //   (cvForms: cvForm[]) => {
    //   this.dataSource.data = cvForms;
    // });
    //  this.userService.fetchCompletedOrCancelledcvForms();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();  // filter property makes as the work
  }
   ngOnDestroy() {
    this.exChangedSubscription.unsubscribe();
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





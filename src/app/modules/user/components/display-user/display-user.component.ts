import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Resume } from 'src/app/shared/resume.module';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {

  @ViewChild('content', {static: false}) content: ElementRef;
  resume$: Observable<Resume>;
  id: string;

  constructor(
    private route: ActivatedRoute,
    public afs: AngularFirestore,
    private userService: UserService)
    {
      this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {

    // this.route.params.subscribe(params => {
    //   this.userService.getObjectById(params.id).subscribe( id => {
    //     this.resume = id;
    // });
    // });
    this.resume$ = this.afs
       .doc<Resume>('cvForm/' + this.id)
       .valueChanges();
  }

  public downloadCv() {
    // const data = document.getElementById('contentToConvert');
    // html2canvas(data).then(canvas => {
    //   // Few necessary setting options
    //   const imgWidth = 208;
    //   const imgHeight = canvas.height * imgWidth / canvas.width;

    //   const contentDataURL = canvas.toDataURL('image/png');
    //   const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    //   const position = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    //   pdf.save('MYPdf.pdf'); // Generated PDF
    // });

    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor'(element, renderer) {
        return true;
      }
    };

    const content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML, 15, 15, {
      width : 50,
      elementHandlers : specialElementHandlers
    });

    // tslint:disable-next-line: only-arrow-functions
    setTimeout(function() {
      doc.save('Cv.pdf');
  }, 0);
  }
}

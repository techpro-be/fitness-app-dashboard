import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  ngOnInit() {}

  // forms: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.forms = db.collection('cvForm').valueChanges();
  // }

  // ngOnInit() {
  // }
  generatePdf() {
    const documentDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    // pdfmake.createPdf(documentDefinition).open();

    pdfMake.createPdf(documentDefinition).download();

    console.log(documentDefinition);

  }

  // public captureScreen() {
  //   const data = document.getElementById('contentToConvert');
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;

  //     const contentDataURL = canvas.toDataURL('image/png');
  //     const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  //     const position = 0;
  //     pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //     pdf.save('MYPdf.pdf'); // Generated PDF
  //   });
  // }
}

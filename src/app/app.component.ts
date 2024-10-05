import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CoreService } from './services/core.service';
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  @ViewChild('content', { static: false }) content!: ElementRef;
  cv:any;
  lang:string = '';

  constructor(private coreService: CoreService){}

  ngOnInit(): void {
    this.coreService.getData('./assets/cv.json').subscribe(
      (resp)=> {
        this.cv = resp.cv;
        this.lang = resp.cv.defaultLang;
      });
  }

  downloadPDF() {
    const element = this.content.nativeElement;
    const options = {
      margin: 0,
      filename: `${this.cv.exportFilename}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf to generate PDF
    html2pdf()
      .from(element)
      .set(options)
      .save();
  }


}

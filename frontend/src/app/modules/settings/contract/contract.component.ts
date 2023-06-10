import { Component, ChangeDetectorRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ElementRef, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Student } from '../../../models/student';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent {
  public student: Student;
  formattedDate = format(new Date(), `dd 'de' MMMM 'de' yyyy`, {
    locale: pt,
  });

  constructor(private bsModalRef: BsModalRef, private cdr: ChangeDetectorRef) {}

  @ViewChild('containerContract', { static: false }) el!: ElementRef;

  ispdf = false;

  sair() {
    this.bsModalRef.hide();
    this.bsModalRef.hide();
  }

  updateElValue() {
    this.ispdf = !this.ispdf;
    this.cdr.detectChanges();
  }

  saveContract() {
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      hotfixes: ['px_scaling'],
    });
    pdf.setCharSpace(-1);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Prestacao de servico');
      },
    });
    this.ispdf = !this.ispdf;
  }
}

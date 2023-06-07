import { Component, ChangeDetectorRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import { ElementRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss'],
})
export class ContractComponent {
  constructor(
    private bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild('containerContract', { static: false }) el!: ElementRef;

  ispdf = false;

  sair() {
    this.bsModalRef.hide();
  }

  updateElValue() {
    this.ispdf = !this.ispdf;
    this.cdr.detectChanges();
  }

  saveContract() {
    debugger;
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

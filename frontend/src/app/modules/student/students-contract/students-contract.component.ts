import { Component } from '@angular/core';
import {jsPDF} from 'jspdf'
import { ElementRef,ViewChild } from '@angular/core';


@Component({
  selector: 'app-students-contract',
  templateUrl: './students-contract.component.html',
  styleUrls: ['./students-contract.component.scss']
})
export class StudentsContractComponent {

  @ViewChild('containerContract',{static:false}) el ! : ElementRef

  saveContract(){
    debugger;
    const pdf = new jsPDF({orientation: 'p' , unit: 'px',format : 'a4' , hotfixes: ['px_scaling']});
    pdf.setCharSpace(-1)
    pdf.html(this.el.nativeElement,{
      callback: (pdf) => {
        pdf.save("Prestacao de servico");
      },
    })
  }

}

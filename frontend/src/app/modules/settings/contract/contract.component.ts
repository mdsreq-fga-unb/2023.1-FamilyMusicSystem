import { Component, ChangeDetectorRef } from "@angular/core";
import { jsPDF } from "jspdf";
import { ElementRef, ViewChild } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Student } from "../../../models/student";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

@Component({
  selector: "app-contract",
  templateUrl: "./contract.component.html",
  styleUrls: ["./contract.component.scss"],
})
export class ContractComponent {
  public student: Student;
  formattedDate = format(new Date(), `dd 'de' MMMM 'de' yyyy`, {
    locale: pt,
  });

  constructor(
    private modal: BsModalRef,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild("containerContract", { static: false }) el!: ElementRef;

  ispdf = false;

  sair() {
    this.modal.hide();
  }

  updateElValue() {
    this.ispdf = !this.ispdf;
    this.cdr.detectChanges();
  }

  saveContract() {
    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "a4",
      hotfixes: ["px_scaling"],
    });
    pdf.setCharSpace(-1);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("Prestacao de servico");
      },
    });
    this.ispdf = !this.ispdf;
  }

  currencyFormatter(num: number): string {
    const valorFormatado = num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return valorFormatado;
  }

  converter(numero: number, tipo: "moeda" | "numerico"): string {
    const unidades = [
      "",
      "um",
      "dois",
      "três",
      "quatro",
      "cinco",
      "seis",
      "sete",
      "oito",
      "nove",
    ];
    const dezADezenove = [
      "dez",
      "onze",
      "doze",
      "treze",
      "quatorze",
      "quinze",
      "dezesseis",
      "dezessete",
      "dezoito",
      "dezenove",
    ];
    const dezenas = [
      "",
      "",
      "vinte",
      "trinta",
      "quarenta",
      "cinquenta",
      "sessenta",
      "setenta",
      "oitenta",
      "noventa",
    ];
    const centenas = [
      "",
      "cento",
      "duzentos",
      "trezentos",
      "quatrocentos",
      "quinhentos",
      "seiscentos",
      "setecentos",
      "oitocentos",
      "novecentos",
    ];

    const valorNumerico = Math.abs(numero);

    if (tipo === "moeda") {
      const valorPorExtenso = this.converterParaExtenso(
        Math.floor(valorNumerico),
        unidades,
        dezADezenove,
        dezenas,
        centenas
      );
      const valorDecimal = Math.round((valorNumerico % 1) * 100);
      const centavos = this.converterParaExtenso(
        valorDecimal,
        unidades,
        dezADezenove,
        dezenas,
        centenas
      );

      let resposta = valorPorExtenso + " reais";
      if (centavos !== "") {
        resposta += " e " + centavos + " centavos";
      }
      return resposta;
    } else if (tipo === "numerico") {
      return this.converterParaExtenso(
        valorNumerico,
        unidades,
        dezADezenove,
        dezenas,
        centenas
      );
    } else {
      return "Tipo de conversão inválido";
    }
  }

  converterParaExtenso(
    numero: number,
    unidades: string[],
    dezADezenove: string[],
    dezenas: string[],
    centenas: string[]
  ): string {
    if (numero === 0) {
      return "zero";
    } else if (numero < 10) {
      return unidades[numero];
    } else if (numero < 20) {
      return dezADezenove[numero - 10];
    } else if (numero < 100) {
      const dezena = Math.floor(numero / 10);
      const unidade = numero % 10;
      if (unidade === 0) {
        return dezenas[dezena];
      } else {
        return dezenas[dezena] + " e " + unidades[unidade];
      }
    } else if (numero < 1000) {
      const centena = Math.floor(numero / 100);
      const resto = numero % 100;
      if (resto === 0) {
        return centenas[centena];
      } else {
        return (
          centenas[centena] +
          " e " +
          this.converterParaExtenso(
            resto,
            unidades,
            dezADezenove,
            dezenas,
            centenas
          )
        );
      }
    } else if (numero < 1000000) {
      const milhar = Math.floor(numero / 1000);
      const resto = numero % 1000;
      if (resto === 0) {
        return (
          this.converterParaExtenso(
            milhar,
            unidades,
            dezADezenove,
            dezenas,
            centenas
          ) + " mil"
        );
      } else {
        return (
          this.converterParaExtenso(
            milhar,
            unidades,
            dezADezenove,
            dezenas,
            centenas
          ) +
          " mil e " +
          this.converterParaExtenso(
            resto,
            unidades,
            dezADezenove,
            dezenas,
            centenas
          )
        );
      }
    }
    return "Número muito grande";
  }
}

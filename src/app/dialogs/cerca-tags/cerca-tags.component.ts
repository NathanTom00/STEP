import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MatDialogRef } from '@angular/material/dialog';
import { EmozioniServiceService } from 'src/app/servizi/emozioni-service.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';
import { AggiungiEmozioniDialogComponent } from '../aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';

@Component({
  selector: 'app-cerca-tags',
  templateUrl: './cerca-tags.component.html',
  styleUrls: ['./cerca-tags.component.css'],
})
export class CercaTagsComponent {
  provinceTotali: string[] = ['Roma', 'Viterbo', 'Latina'];
  provinceSelezionati: string[] = [];

  emozioniTotali: string[] = [];
  emozioniSelezionati: string[] = [];

  obiettiviTotali: string[] = [];
  obiettiviSelezionati: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AggiungiEmozioniDialogComponent>,
    private obiettivi: ObiettiviService,
    private emozioni: EmozioniServiceService
  ) {
    this.emozioniTotali = emozioni.getEmozioni();
    this.obiettiviTotali = obiettivi.getObiettivi().map((data) => data.nome);
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  selezionaTag(label: string, chip: MatChip, tipo: string) {
    switch (tipo) {
      case 'provincia':
        if (!this.provinceSelezionati.includes(label)) {
          chip._elementRef.nativeElement.classList.add('selected');
          this.provinceSelezionati.push(label);
        } else {
          chip._elementRef.nativeElement.classList.remove('selected');
          this.provinceSelezionati = this.provinceSelezionati.filter(
            (item: string) => item !== label
          );
        }
        break;

      case 'emozione':
        if (!this.emozioniSelezionati.includes(label)) {
          chip._elementRef.nativeElement.classList.add('selected');
          this.emozioniSelezionati.push(label);
        } else {
          chip._elementRef.nativeElement.classList.remove('selected');
          this.emozioniSelezionati = this.emozioniSelezionati.filter(
            (item: string) => item !== label
          );
        }
        break;

      case 'obiettivo':
        if (!this.obiettiviSelezionati.includes(label)) {
          chip._elementRef.nativeElement.classList.add('selected');
          this.obiettiviSelezionati.push(label);
        } else {
          chip._elementRef.nativeElement.classList.remove('selected');
          this.obiettiviSelezionati = this.obiettiviSelezionati.filter(
            (item: string) => item !== label
          );
        }
        break;

      default:
        break;
    }
  }

  cerca() {
    this.dialogRef.close({
      provinceSelezionati: this.provinceSelezionati,
      emozioniSelezionati: this.emozioniSelezionati,
      obiettiviSelezionati: this.obiettiviSelezionati,
    });
  }
}

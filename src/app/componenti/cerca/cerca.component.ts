import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CercaTagsComponent } from 'src/app/dialogs/cerca-tags/cerca-tags.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css'],
})
export class CercaComponent implements OnInit {
  stringaDaCercare = '';
  emozioniSelezionati: any[] = [];
  obiettiviSelezionati: any[] = [];
  suggerimenti$!: Observable<any>;
  cercaForm: FormGroup = new FormGroup({
    cercaInput: new FormControl(''),
  });

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.suggerimenti$ = this.firestoreService.getLuoghiLimitato();
  }

  cercaSubmit() {
    this.stringaDaCercare = this.cercaForm.value.cercaInput;
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  goToLuogo(idLuogo: string) {
    this.router.navigate(['luoghi/' + idLuogo]);
  }

  onClickFiltra() {
    const dialogRef = this.dialog.open(CercaTagsComponent, {
      maxWidth: '100vw',
      width: '100%',
    });

    let provinceSelezionati;
    let emozioniSelezionati;
    let obiettiviSelezionati
    
    dialogRef.componentInstance.daCercare.subscribe(result => {
      provinceSelezionati = result.provinceSelezionati
      emozioniSelezionati = result.emozioniSelezionati
      obiettiviSelezionati = result.obiettiviSelezionati

    });


  }
}

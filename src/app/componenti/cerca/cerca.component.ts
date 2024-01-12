import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, concatMap, forkJoin, switchMap, toArray } from 'rxjs';
import { CercaMappaComponent } from 'src/app/dialogs/cerca-mappa/cerca-mappa.component';
import { CercaTagsComponent } from 'src/app/dialogs/cerca-tags/cerca-tags.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css'],
})
export class CercaComponent implements OnInit {
  stringaDaCercare = '';
  provinceSelezionati: any[] = [];
  emozioniSelezionati: any[] = [];
  obiettiviSelezionati: any[] = [];
  luoghiLimitati$!: Observable<any>;
  luoghi_all$ !: Observable<any>;

  cercaForm: FormGroup = new FormGroup({
    cercaInput: new FormControl(''),
  });

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.luoghiLimitati$ = this.firestoreService.getLuoghiLimitato();
    this.luoghi_all$ = this.firestoreService.getLuoghi()
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  goToLuogo(idLuogo: string) {
    this.router.navigate(['luoghi/' + idLuogo]);
  }

  cercaSubmit(luoghi : any) {
    this.stringaDaCercare = this.cercaForm.value.cercaInput;
    this.getLuoghiSelezionati(luoghi)
  }

  onClickFiltra() {
    const dialogRef = this.dialog.open(CercaTagsComponent, {
      maxWidth: '100vw',
      width: '100%',
    });

    this.provinceSelezionati = []
    this.emozioniSelezionati = []
    this.obiettiviSelezionati = []
    dialogRef.afterClosed().subscribe((datas: any) => {
      if(datas.provinceSelezionati)
        this.provinceSelezionati = datas.provinceSelezionati;
      if(datas.emozioniSelezionati)
        this.emozioniSelezionati = datas.emozioniSelezionati;
      if(datas.obiettiviSelezionati)
        this.obiettiviSelezionati = datas.obiettiviSelezionati;

      console.log(this.provinceSelezionati,this.emozioniSelezionati,this.obiettiviSelezionati)
    });
  }

  eliminaProvincia(provincia: string) {
    this.provinceSelezionati = this.provinceSelezionati.filter(
      (provinciaSelezionata) => provinciaSelezionata !== provincia
    );
  }

  eliminaEmozione(emozione: string) {
    this.emozioniSelezionati = this.emozioniSelezionati.filter(
      (emozioneSelezionato) => emozioneSelezionato !== emozione
    );
  }

  eliminaObiettivo(obiettivo: string) {
    this.obiettiviSelezionati = this.obiettiviSelezionati.filter(
      (obiettivoSelezionato) => obiettivoSelezionato !== obiettivo
    );
  }

  verificaLuogo(luogo: any): boolean {
    console.log(this.emozioniSelezionati,this.obiettiviSelezionati)
    if(this.provinceSelezionati.length !== 0){
      if (this.provinceSelezionati.length !== 1) return false;

      if (this.provinceSelezionati[0] !== luogo.provincia) return false;
    }

    //console.log(luogo.emozioni,this.emozioniSelezionati,this.emozioniSelezionati.length !== 0 && !luogo.emozioni.includes(this.emozioniSelezionati))
    
    
    if(this.emozioniSelezionati.length !== 0 ){
      for(let emozioneDaFiltrare of this.emozioniSelezionati){
        if(!luogo.emozioni.includes(emozioneDaFiltrare))
          return false
      }
    }
      
    if(this.obiettiviSelezionati.length !== 0){
      let obiettiviLuogo = luogo.obiettivi.map((obv: any) => obv.nome)
      
      for(let obiettivoDaFiltrare of this.obiettiviSelezionati){
        if(!obiettiviLuogo.includes(obiettivoDaFiltrare))
          return false
      }
    }


    return true;
  }

  getLuoghiSelezionati(luoghi : any) : any[]{

    
    let ris = luoghi

    if(this.stringaDaCercare !== ''){
      ris  = ris.filter((luogo : any) => luogo.nome.includes(this.stringaDaCercare))
    }

    for(let itemRis of ris){
      if(!this.verificaLuogo(itemRis)){
        ris = ris.filter((items:any) => items !== itemRis)
      }
    }
    return ris

    
  }

  openMap(){
    this.dialog.open(CercaMappaComponent,{
    })
  }
}

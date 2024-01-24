import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModificaObiettivoDialogComponent } from 'src/app/dialogs/modifica-obiettivo-dialog/modifica-obiettivo-dialog.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';

@Component({
  selector: 'app-modifica-luogo',
  templateUrl: './modifica-luogo.component.html',
  styleUrls: ['./modifica-luogo.component.css'],
})
export class ModificaLuogoComponent implements OnInit {
  idLuogo!: string;
  luogo: any;
  luogoModificato: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router,
    private obiettiviService : ObiettiviService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.activatedRoute.snapshot.paramMap.get('idLuogo'))
      this.router.navigate(['dashboard']);

    this.idLuogo = this.activatedRoute.snapshot.paramMap.get('idLuogo')!;

    this.firestoreService.getLuoghi().subscribe((luoghi: any) => {
      for(let luogo of luoghi){
        if(this.idLuogo === luogo.id){
          this.luogo = structuredClone( luogo)
          this.luogoModificato = structuredClone( luogo)
        }
      }
    });

  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  

  rimuoviEmozione(emozioneDaRimuovere : string){
    this.luogoModificato['emozioni'] = this.luogoModificato['emozioni'].filter((emozione : string) => emozione !== emozioneDaRimuovere)
    console.log(this.luogoModificato)
  }

  getIconByName(nomeObiettivo: string) {
    for (let obiettivo of this.obiettiviService.getObiettivi()) {
      if (obiettivo.nome === nomeObiettivo) return obiettivo.icon;
    }

    return '';
  }

  openModificaObiettivoDialog(iObiettivo : number){
    let obiettivoDaModificare = this.luogoModificato['obiettivi'][iObiettivo]
    let dialogRef = this.dialog.open(ModificaObiettivoDialogComponent,{
      maxWidth: '90vw',
      width: '90%',
      data: { obiettivo: obiettivoDaModificare },
      
    })

    dialogRef.afterClosed().subscribe((risultato : any) => {
      if(risultato.tipoOperazione === 'annulla')
        return
      
      if(risultato.tipoOperazione === 'modifica'){
        this.luogoModificato['obiettivi'][iObiettivo] = risultato.nuovoObiettivo 
        return
      }

      if(risultato.tipoOperazione === 'elimina'){
        this.luogoModificato['obiettivi'] = this.luogoModificato['obiettivi'].filter((value : any , index: number) => index !== iObiettivo)
      }


    })
  }

  annulla(){
    this.luogoModificato = this.luogo
    console.log(this.luogo)
  }

  test(){
    console.log(this.luogoModificato)
  }

  
  
}

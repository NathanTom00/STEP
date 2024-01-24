import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AggiungiObiettivoLuogoComponent } from 'src/app/dialogs/aggiungi-obiettivo-luogo/aggiungi-obiettivo-luogo.component';
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
  immLinkDaEliminare : string[] = []

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
  }

  getIconByName(nomeObiettivo: string) {
    for (let obiettivo of this.obiettiviService.getObiettivi()) {
      if (obiettivo.nome === nomeObiettivo) return obiettivo.icon;
    }

    return '';
  }

  aggiungiObiettivo(){
    let dialogRef = this.dialog.open(AggiungiObiettivoLuogoComponent,{
      maxWidth: '90vw',
      width: '90%',
      data: {
        nomeObiettiviLuogo : this.luogoModificato['obiettivi'].map((obiettivo : any) => obiettivo.nome)
      }
    })

    dialogRef.afterClosed().subscribe((data : any) => {
      if(!data)
        return
      if(data === '')
        return

        this.luogoModificato['obiettivi'].push({nome: data, container: []})
    })


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
        this.immLinkDaEliminare = risultato.immLinkDaEliminare
        return
      }

      if(risultato.tipoOperazione === 'elimina'){
        this.luogoModificato['obiettivi'] = this.luogoModificato['obiettivi'].filter((value : any , index: number) => index !== iObiettivo)
        
      }

      


    })
  }

  annulla(){
    this.luogoModificato = this.luogo
  }

  test(){
    this.firestoreService.modificaLuogo(this.idLuogo,this.luogoModificato,this.immLinkDaEliminare)
    alert("Luogo modificato correttamente")
  }
  
  
}

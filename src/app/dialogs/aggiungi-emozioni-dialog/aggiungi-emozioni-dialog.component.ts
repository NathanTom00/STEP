import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmozioniServiceService } from 'src/app/servizi/emozioni-service.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';

@Component({
  selector: 'app-aggiungi-emozioni-dialog',
  templateUrl: './aggiungi-emozioni-dialog.component.html',
  styleUrls: ['./aggiungi-emozioni-dialog.component.css'],
})
export class AggiungiEmozioniDialogComponent implements OnInit{
  idLuogo: string;
  emozioniNotInLuogo : string[] = [];
  emozioniSelezionati : string[] = []
  @Output() nuoveAggiunte = new EventEmitter<any>();

  firestoreSub : any;
  constructor(
    public dialogRef: MatDialogRef<AggiungiEmozioniDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emozioniService : EmozioniServiceService,
    private firestoreService : FirestoreService
  ) {
    this.idLuogo = data.idLuogo;
  }

  ngOnInit(): void {
    
    const arrEmozioni = this.emozioniService.getEmozioni()
    this.firestoreSub = this.firestoreService.getLuoghi().subscribe((data:any)=>{
      let luogoSelezionato;
      for(let luogo of data){
        if(this.idLuogo===luogo.id)
          luogoSelezionato = luogo
      }

      for(let emozione of arrEmozioni){
        //console.log(emozione,luogoSelezionato.emozioni)
        if(!luogoSelezionato.emozioni.includes(emozione))
            this.emozioniNotInLuogo.push(emozione)
      }
    })
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }


  selezionaEmozione(emozione : string,chip : MatChip){
    if(!this.emozioniSelezionati.includes(emozione)){
      chip._elementRef.nativeElement.classList.add('selected');
      this.emozioniSelezionati.push(emozione)
      console.log(this.emozioniSelezionati)
    }else{
      chip._elementRef.nativeElement.classList.remove('selected');
      this.emozioniSelezionati = this.emozioniSelezionati.filter((item: string) => item !== emozione)
      console.log(this.emozioniSelezionati)
    }
  }

  aggiungiEmozioni(){
    
    this.firestoreService.aggiungiEmozioni(this.idLuogo,this.emozioniSelezionati)
    this.nuoveAggiunte.emit(this.emozioniSelezionati);
    this.dialogRef.close()
  }


}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';

@Component({
  selector: 'app-aggiungi-obiettivo-luogo',
  templateUrl: './aggiungi-obiettivo-luogo.component.html',
  styleUrls: ['./aggiungi-obiettivo-luogo.component.css'],
})
export class AggiungiObiettivoLuogoComponent {
  nomiObiettivi : string[]
  obiettivoDaAggiungere : string = ''
  arrNomiObiettivi : string[] 

  constructor(
    public dialogRef: MatDialogRef<AggiungiObiettivoLuogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private obiettiviService: ObiettiviService,
    private dialog: MatDialog
  ) {
    this.nomiObiettivi =  data.nomeObiettiviLuogo
    //arrNomiObiettivi contiene i nomi degli obiettivi che non sono presenti nel luogo da modificare
    this.arrNomiObiettivi = obiettiviService.getObiettivi().map((obiettivi:any)=> obiettivi.nome).filter((nomeObiettivo : any)=>!this.nomiObiettivi.includes(nomeObiettivo))
    
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  chiudi(){
    this.dialogRef.close()
  }

  salva(){
    this.dialogRef.close(this.obiettivoDaAggiungere)
  }

}

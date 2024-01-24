import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ZoomInImgComponent } from '../zoom-in-img/zoom-in-img.component';

@Component({
  selector: 'app-modifica-obiettivo-dialog',
  templateUrl: './modifica-obiettivo-dialog.component.html',
  styleUrls: ['./modifica-obiettivo-dialog.component.css'],
})
export class ModificaObiettivoDialogComponent {
  /**
   * Una volta chiuso il dialog ritornerà una variabile di tipo:
   *  {
   *    tipoOperazione: string, 
   *    nuovoObiettivo: { nome: string; container: any[] }
   *  }.
   * 
   * Se tipoOperazione è di tipo "elimina" allora bisognerà cancellare l'obiettivo (in modifica-luogo-component)
   * Se tipoOperazione è di tipo "modifica" allora l'obiettivo in modifica-luogo-component sarà assegnato al valore di ritorno del dialog
   * Se si chiude il dialog allora verrà fatta ritornare: {tipoOperazione: 'annulla', nuovoObiettivo: obiettivo}. In questo caso modifica-luogo-component non leggerà nuovoObiettivo
   */
  obiettivo!: { nome: string; container: any[] };
  risultato : {tipoOperazione: string, nuovoObiettivo: { nome: string, container: any[]}}

  constructor(
    public dialogRef: MatDialogRef<ModificaObiettivoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog : MatDialog
  ) {
    this.obiettivo = structuredClone(data.obiettivo);
    //inizializzo il risultato come annulla
    this.risultato = {tipoOperazione: 'annulla', nuovoObiettivo: this.obiettivo}
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  navTo(link: string) {
    window.location.href = link;
  }

  zoomImm(src: string) {
    this.dialog.open(ZoomInImgComponent, {
      maxWidth: '90vw',
      width: '90%',
      data: { src: src },
    });
  }

  eliminaItem(iItem : number){
    this.obiettivo['container'] = this.obiettivo['container'].filter((value: any,index:number) => index !== iItem)
  }

  chiudi(){
    this.dialogRef.close(this.risultato)
  }

  salvaModifiche(){
    this.risultato.tipoOperazione = 'modifica'
    this.risultato.nuovoObiettivo = this.obiettivo
    this.chiudi()
  }

  eliminaAnima(){
    this.risultato.tipoOperazione = 'elimina'
    this.risultato.nuovoObiettivo = this.obiettivo
    this.chiudi()
  }
  


}

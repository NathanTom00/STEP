import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmozioniServiceService } from 'src/app/servizi/emozioni-service.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { AggiungiEmozioniDialogComponent } from '../aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-aggiungi-anima',
  templateUrl: './aggiungi-anima.component.html',
  styleUrls: ['./aggiungi-anima.component.css']
})
export class AggiungiAnimaComponent implements OnInit{
  /**
   * nel container ci possono essere due tipi di items:
   * la prima come immagine semplice, la seconda come link con titolo => idea il container riceve oggetti di tipo:
   * se tipo 1:
   *    {
   *      tipo:string = 'link',titolo: string, link: string
   *    }
   * 
   * se tipo 2:
   *    {
   *      tipo:string = 'imm',link : string  
   *    }
   */

  sezioneLink = true //true se stiamo in sezione link; false se stiamo in sezione imm
  idLuogo:string;
  iObiettivo: string;
  caricamento : boolean = false
  completato : boolean = false
  currentUser : any

  private urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  linkForm: FormGroup = new FormGroup({
    titolo: new FormControl('', [Validators.required,Validators.maxLength(7)]),
    link: new FormControl('', [Validators.required,Validators.pattern(this.urlRegex)]),
  });

  immForm: FormGroup = new FormGroup({
    imm: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<AggiungiEmozioniDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emozioniService : EmozioniServiceService,
    private firestoreService : FirestoreService,
    private authService : AuthService
  ) {
    this.idLuogo = data.idLuogo;
    this.iObiettivo = data.iObiettivo;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(data => this.currentUser = data)
  }

  cambiaSezione(sezioneDaCambiare :boolean){
    if(sezioneDaCambiare == this.sezioneLink){
      return
    }
    this.sezioneLink = sezioneDaCambiare

  }

  async aggiungiLink(){

    const titolo = this.linkForm.value.titolo
    const  link = this.linkForm.value.link

    this.caricamento = true
    const up = this.firestoreService.uploadLink(this.idLuogo,this.iObiettivo,titolo,link,this.currentUser.uid)
    await up
    this.caricamento = false;
    this.completato = true;
  }

  async aggiungiImm(){
    
    let imm = this.immForm.value.imm;

    this.caricamento = true;
    const up = this.firestoreService.uploadImm(this.idLuogo,this.iObiettivo,imm,this.currentUser.uid)
    await up
    this.caricamento = false;
    this.completato = true;
  }
}

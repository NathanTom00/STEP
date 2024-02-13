import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-aggiungi-commento',
  templateUrl: './aggiungi-commento.component.html',
  styleUrls: ['./aggiungi-commento.component.css']
})
export class AggiungiCommentoComponent implements OnInit{
  aggiungiCommentoForm : FormGroup = new FormGroup({
    recensione : new FormControl(),
    titolo : new FormControl(),
    descrizione : new FormControl(),
  })

  userID !: string
  userName !: string
  idLuogo !: string
  constructor(private userService : UserService, private firestoreService : FirestoreService,  public dialogRef: MatDialogRef<AggiungiCommentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.idLuogo = data.idLuogo
    }

  ngOnInit(): void {
    this.userService.currentUserProfile$.subscribe((user:any) => {this.userID = user.uid; this.userName = user.nome})
  }
  
  
  /**
   * TODO: prendere l'idLuogo dall'input
   */

  onSubmit(){
    
    let nuovoCommentoSTEP = this.aggiungiCommentoForm.value
    nuovoCommentoSTEP['idCreatore'] = this.userID
    nuovoCommentoSTEP['fonte'] = 'step'
    nuovoCommentoSTEP['data'] = Date.now()
    nuovoCommentoSTEP['nomeUser'] = this.userName
    this.firestoreService.aggiungiCommentoLuogo(nuovoCommentoSTEP, this.idLuogo)

    this.dialogRef.close()
  }
}

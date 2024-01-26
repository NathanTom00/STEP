import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-modifica-profilo-user',
  templateUrl: './modifica-profilo-user.component.html',
  styleUrls: ['./modifica-profilo-user.component.css'],
})
export class ModificaProfiloUserComponent implements OnInit {
  /**
   * Per cambiare email bisogna fare una richiesta anche all'authservice di cambiare email
   * mentre per cambiare anima locus e nome basta il firestore
   * per la password invece è possibile solo resettare la password
   */
  currentUserModificato: any;
  currentUser: any;
  obiettivi : any;

  constructor(
    protected authService: AuthService,
    private firestoreService : FirestoreService,
    private userService: UserService,
    private obiettiviService : ObiettiviService
  ) {
    userService.currentUserProfile$.subscribe((data) => {
      this.currentUserModificato = structuredClone(data);
      this.currentUser = data;
    });
  }

  ngOnInit(): void {
    this.obiettivi = this.obiettiviService.getObiettivi()
  }

  onClickObiettivo(button: HTMLButtonElement) {
    let obiettivo: string = button.value;
    if (this.currentUserModificato.obiettiviInteressati.includes(obiettivo)) {
      this.currentUserModificato.obiettiviInteressati = this.currentUserModificato.obiettiviInteressati.filter(
        (item: string) => item !== obiettivo
      );
    } else {
      this.currentUserModificato.obiettiviInteressati.push(obiettivo);
    }
  }

  onClickSalva(){
    //TODO: salva modifica sul db firestore. Se anche l'email è stata modificata allora bisogna cambiarla anche nell'auth server
    try {
      if(this.currentUserModificato.email !== this.currentUser.email){
        this.authService.changeEmail(this.currentUserModificato.email)
      }
  
      
      
    } catch (error) {
      this.authService.signOut()
      alert("Sessione di login scaduta")
    } finally{
      this.firestoreService.modificaUtente(this.currentUserModificato)
    }
    

  }

  isModificato(): boolean{
    if(this.currentUser['nome'] !== this.currentUserModificato['nome'])
      return true

    if(this.currentUser['email'] !== this.currentUserModificato['email'])
      return true

    if(this.currentUser['obiettiviInteressati'].length !== this.currentUserModificato['obiettiviInteressati'].length)
      return true

    let obiettiviCorrenti = this.currentUser['obiettiviInteressati'].sort()
    let obiettiviModificati = this.currentUserModificato['obiettiviInteressati'].sort()

    for(let i=0; i<obiettiviCorrenti.length ; i++){
      if(obiettiviCorrenti[i]!== obiettiviModificati[i])
        return true
    }
    
    return false 
  }
}

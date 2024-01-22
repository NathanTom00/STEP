import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BadgeService } from 'src/app/servizi/badge.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit{

  nomeDaCercare = ''
  utenti : any[] = [];
  utenteCercato : any = null; 
  cercaForm: FormGroup = new FormGroup({
    cercaInput: new FormControl(''),
  });

  constructor(private firestoreService : FirestoreService, private badgeService : BadgeService){}

  ngOnInit(): void {
    this.firestoreService.getClassifica().subscribe(
      
      (data : any) => {
        this.utenti=data.sort((utenteA : any,utenteB : any) => {
          if(utenteA['livello'] > utenteB['livello']) return -1
          if(utenteA['livello'] > utenteB['livello']) return 1
          return 0
        }).map((utente:any, index: number) => {
          utente['posizione'] = index+1
          return utente
        })
      }
    )
  }
  
  getLink(nomeBadge:string){
    for(let badgeConImm of this.badgeService.badge){
      if(badgeConImm.nome === nomeBadge)
        return badgeConImm.link
    }

    return ''
  }

  cercaSubmit(){
    this.utenteCercato = null
    this.nomeDaCercare = this.cercaForm.value.cercaInput
    //console.log(this.nomeDaCercare)
    for(let utente of this.utenti){
      if(utente.nome === this.nomeDaCercare)
        this.utenteCercato = utente
    }
  }


}

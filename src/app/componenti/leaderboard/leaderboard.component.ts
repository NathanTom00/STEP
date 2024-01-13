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
  utenteCercato : any; 
  cercaForm: FormGroup = new FormGroup({
    cercaInput: new FormControl(''),
  });

  constructor(private firestoreService : FirestoreService, private badgeService : BadgeService){}

  ngOnInit(): void {
    let elementoDaAggiungere ;
    this.firestoreService.getClassifica().subscribe(
      
      (data : any) => {
        for(const [index, value] of data.entries()){
          elementoDaAggiungere = value
          elementoDaAggiungere['posizione'] = index + 1
          //console.log(elementoDaAggiungere)
          this.utenti.push(elementoDaAggiungere)
        }
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

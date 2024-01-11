import { Component } from '@angular/core';
import { UserProfile } from 'firebase/auth';
import { Observable } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { BadgeService } from 'src/app/servizi/badge.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-profilo-user',
  templateUrl: './profilo-user.component.html',
  styleUrls: ['./profilo-user.component.css']
})
export class ProfiloUserComponent {


  /**
   * LE sezioni possono essere challenge,badge e cronologia
   */
  sezioneLink = 'challenge'
  currentUser$ : Observable<ProfileUser|null>;
  taskDaFare : any
  
  constructor(private userService : UserService, private firestoreService : FirestoreService,private badgeService : BadgeService){
    this.currentUser$ = userService.currentUserProfile$
  }



  goToModifica(){
    console.log("daje")
  }

  cambiaSezione(sezioneDaCambiare  :string){
    if(sezioneDaCambiare === this.sezioneLink){
      return
    }
    this.sezioneLink = sezioneDaCambiare

  }

  controllaTask(taskFatti : any[],task:any) : boolean{
    return taskFatti.map((data:any) => data.nome).includes(task.nome)
  }

  getLink(nomeBadge:string){
    for(let badgeConImm of this.badgeService.badge){
      if(badgeConImm.nome === nomeBadge)
        return badgeConImm.link
    }

    return ''
  }
}

import { Component } from '@angular/core';
import { UserProfile } from 'firebase/auth';
import { Observable } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
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

  constructor(private userService : UserService, private firestoreService : FirestoreService){
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
}

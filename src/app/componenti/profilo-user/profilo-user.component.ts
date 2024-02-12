import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'firebase/auth';
import { Observable, concat, forkJoin, map, switchMap } from 'rxjs';
import { LuoghiFiltroEmozioneComponent } from 'src/app/dialogs/luoghi-filtro-emozione/luoghi-filtro-emozione.component';
import { ProfileUser } from 'src/app/models/user-profile';
import { BadgeService } from 'src/app/servizi/badge.service';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-profilo-user',
  templateUrl: './profilo-user.component.html',
  styleUrls: ['./profilo-user.component.css'],
})
export class ProfiloUserComponent implements OnInit {
  /**
   * Le sezioni possono essere challenge,badge, cronologia e myStep
   */
  sezioneLink = 'challenge';
  currentUser$: Observable<ProfileUser | null>;

  uid!: string;
  animaAggiunti: any[] = []; //anima locus aggiunti dallo user
  emozioniAggiunti: any[] = []; //emozioni aggiunti dallo user, ogni el di questo arr sarà del tipo: {nomeEmozione : string, luoghi: []} dove luoghi è arr di idLuogo
  commentiAggiunti: any[] = []; //commenti aggiunto dallo user

  taskDaFare: any;

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService,
    private badgeService: BadgeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog : MatDialog
  ) {
    this.currentUser$ = userService.currentUserProfile$;
  }

  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(
        switchMap((response) => {
          return this.firestoreService
            .getLuoghi()
            .pipe(map((luoghi: any) => ({ user: response, luoghi })));
        })
      )
      .subscribe((data: any) => {
        this.animaAggiunti = [];
        this.emozioniAggiunti = [];
        this.commentiAggiunti = [];
        this.uid = data.user.uid;
        for (let luogo of data.luoghi) {
          for (let [iObiettivo, anima] of luogo['obiettivi'].entries()) {
            for (let [iContainer, content] of anima['container'].entries()) {
              if (content['idCreatore'] === this.uid) {
                content['idLuogo'] = luogo.id;
                content['nomeLuogo'] = luogo.nome;
                content['nomeObiettivo'] = anima.nome;
                content['iObiettivo'] = iObiettivo;
                content['iContainer'] = iContainer;
                this.animaAggiunti.push(content);
              }
            }
          }

          for(let emozione of luogo.emozioni){
            if(emozione['idCreatore']){
              if(emozione['idCreatore'] === this.uid){
                //devo aggiungere l'emozione 
                this.aggiungiEmozione(emozione.emozione,luogo.id)
              }
            }
          }

          for(let [iCommento,commento] of luogo.commenti.entries()){
            if(commento.idCreatore === this.uid){

              this.commentiAggiunti.push({commento:commento, idLuogo: luogo.id, nomeLuogo : luogo.nome})
            }
          }

          
        }


      });
  }

  aggiungiEmozione(emozione : string, idLuogo : string){
    for(let emozioneAggiunta of this.emozioniAggiunti){
      if(emozione === emozioneAggiunta.nomeEmozione){
        emozioneAggiunta.luoghi.push(idLuogo)
        return
      }
    }

    //se non ritorna prima allora devo crearne uno nuovo
    const nuovaEmozione = {nomeEmozione: emozione, luoghi: [idLuogo]}
    this.emozioniAggiunti.push(nuovaEmozione)
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  goToModifica() {
    this.router.navigate(['modifica'], { relativeTo: this.activatedRoute });
  }

  cambiaSezione(sezioneDaCambiare: string) {
    if (sezioneDaCambiare === this.sezioneLink) {
      return;
    }
    this.sezioneLink = sezioneDaCambiare;
  }

  controllaTask(taskFatti: any[], task: any): boolean {
    return taskFatti.map((data: any) => data.nome).includes(task.nome);
  }

  getLink(nomeBadge: string) {
    for (let badgeConImm of this.badgeService.badge) {
      if (badgeConImm.nome === nomeBadge) return badgeConImm.link;
    }

    return '';
  }

  eliminaAnima(anima: any) {
    this.firestoreService.eliminaAnimaLocusContent(
      anima.idLuogo,
      anima.iObiettivo,
      anima.iContainer
    );
  }

  displayLuoghi(emozioneAggiunta : any){
    const dialogRef = this.dialog.open(LuoghiFiltroEmozioneComponent, {
      maxWidth: '90vw',
      width: '90%',
      data: { luoghi: emozioneAggiunta.luoghi },
    });
    
  }

  eliminaCommento(commento : any){
    this.firestoreService.eliminaCommentoLuogo(commento.commento, commento.idLuogo)
  }
}

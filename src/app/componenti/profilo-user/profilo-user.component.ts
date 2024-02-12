import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfile } from 'firebase/auth';
import { Observable } from 'rxjs';
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
   * Le sezioni possono essere challenge,badge e cronologia
   */
  sezioneLink = 'challenge';
  currentUser$: Observable<ProfileUser | null>;
  luoghi : any;
  taskDaFare: any;

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService,
    private badgeService: BadgeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentUser$ = userService.currentUserProfile$;
  }

  ngOnInit(): void {
    this.firestoreService.getLuoghi().subscribe( data => this.luoghi = data )
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
}

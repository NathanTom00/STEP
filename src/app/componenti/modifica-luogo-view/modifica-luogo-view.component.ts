import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, filter, mergeMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AggiungiEmozioniDialogComponent } from 'src/app/dialogs/aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';
import { LoginSignupDialogComponent } from 'src/app/dialogs/login-signup-dialog/login-signup-dialog.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-modifica-luogo-view',
  templateUrl: './modifica-luogo-view.component.html',
  styleUrls: ['./modifica-luogo-view.component.css'],
})
export class ModificaLuogoViewComponent {
  idLuogo: string | null = null;
  luogo$!: Observable<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    protected authService: AuthService,
    private firestoreService: FirestoreService,
    private obiettiviService: ObiettiviService,
    private dialog: MatDialog,
    protected cookieService: CookieService
  ) {}

  ngOnInit(): void {

    /**Inizio visualizzazione luogo */
    this.idLuogo = this.activatedRoute.snapshot.paramMap.get('idLuogo');

    this.luogo$ = this.firestoreService.getLuoghi().pipe(
      mergeMap((data) => data),
      filter((data: any) => data.id == this.idLuogo)
    );

  }


  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  esploraAnimaLocus(idLuogo: string, i: number) {
    //vai in luoghi/:idLuogo/:i
    this.router.navigate([`luoghi/${idLuogo}/${i}`]);
  }

  getIconByName(nomeObiettivo: string) {
    for (let obiettivo of this.obiettiviService.getObiettivi()) {
      if (obiettivo.nome === nomeObiettivo) return obiettivo.icon;
    }

    return '';
  }

  aggiungiEmozione(idLuogo: string) {
    const dialogRef = this.dialog.open(AggiungiEmozioniDialogComponent, {
      maxWidth: '90vw',
      width: '90%',
      data: { idLuogo: idLuogo },
    });
  }


  navigaLink(link: string) {
    window.location.href = link;
  }

  modificaLuogo(){
    this.router.navigate(['modifica'], {relativeTo: this.activatedRoute})
  }
}

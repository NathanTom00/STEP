import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, filter, mergeMap, toArray } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AggiungiEmozioniDialogComponent } from 'src/app/dialogs/aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';
import { LoginSignupDialogComponent } from 'src/app/dialogs/login-signup-dialog/login-signup-dialog.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';
import { UserService } from 'src/app/servizi/user.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-luogo',
  templateUrl: './luogo.component.html',
  styleUrls: ['./luogo.component.css'],
})
export class LuogoComponent implements OnInit {
  idLuogo: string | null = null;
  luogo$!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected authService: AuthService,
    private firestoreService: FirestoreService,
    private obiettiviService: ObiettiviService,
    private dialog: MatDialog,
    private userService: UserService,
    protected cookieService: CookieService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
    
  ) {}

  ngOnInit(): void {
    /**aggiungo un cookie per contare quante volte ho visitato il luogo*/
    if (!this.cookieService.check('count_visite_luogo')) {
      this.cookieService.set('count_visite_luogo', '0');
    }
    this.cookieService.set(
      'count_visite_luogo',
      (parseInt(this.cookieService.get('count_visite_luogo')) + 1).toString()
    );

    /** se l'utente è loggato allora devo cambiare il suo count */
    this.authService.currentUser$.subscribe((user: any) => {
      if (!user) return;
      this.userService.incrementaCountLuoghi(user);
    });

    const count_visite_luogo = parseInt(
      this.cookieService.get('count_visite_luogo')
    );

    /**Inizio visualizzazione luogo */
    this.idLuogo = this.route.snapshot.paramMap.get('id_luogo');

    this.luogo$ = this.firestoreService.getLuoghi().pipe(
      mergeMap((data) => data),
      filter((data: any) => data.id == this.idLuogo)
    );

    this.authService.currentUser$.subscribe((user) => {
      //se user non è loggato e abbiamo la 1 + 5k visita allora apro il dialog
      if (!user && count_visite_luogo % 5 == 1)
        this.dialog.open(LoginSignupDialogComponent, {
          maxWidth: '90vw',
          width: '90%',
          data: { singUpPage: false },
        });
    });
  }

  onShare() {
    this.clipboard.copy(window.location.href)
    this.snackBar.open('Indirizzo URL copiato','OK');
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

  navigaMaps(coordinate: string) {
    //https://www.google.com/maps/search/?api=1&query=<lat>,<lng>
    window.location.href = `https://www.google.com/maps/search/?api=1&query=${coordinate}`;
  }

  navigaLink(link: string) {
    window.location.href = link;
  }
}

import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, filter, mergeMap, toArray } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AggiungiEmozioniDialogComponent } from 'src/app/dialogs/aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';
import { LoginSignupDialogComponent } from 'src/app/dialogs/login-signup-dialog/login-signup-dialog.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';
import { UserService } from 'src/app/servizi/user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AggiungiCommentoComponent } from 'src/app/dialogs/aggiungi-commento/aggiungi-commento.component';

@Component({
  selector: 'app-luogo',
  templateUrl: './luogo.component.html',
  styleUrls: ['./luogo.component.css'],
})
export class LuogoComponent implements OnInit, AfterViewChecked{
  idLuogo: string | null = null;
  luogo$!: Observable<any>;
  userId : string = ''
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
  };

  controlloLinkConAnchor = true //true se devo fare il controllo dell'ancora false altrimenti
  fragmentCommento: string | null = null; 

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
      this.userId = user.uid
      this.userService.incrementaCountLuoghi(user);
    });

    const count_visite_luogo = parseInt(
      this.cookieService.get('count_visite_luogo')
    );

    /**Inizio visualizzazione luogo */
    this.idLuogo = this.route.snapshot.paramMap.get('id_luogo');
    this.route.fragment.subscribe(fragment => { this.fragmentCommento = fragment; }); //se ha il fragment allora devo navigare fino al commento con id = fragment

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
          data: { singUpPage: 'signup' },
        });
    });

  }

  ngAfterViewChecked(): void {
    try {
      if(!this.controlloLinkConAnchor && document.querySelector('#' + this.fragmentCommento) === null)
        return

      
      this.controlloLinkConAnchor = false
      document.querySelector('#' + this.fragmentCommento)!.scrollIntoView();
    } catch (e) { }
  }

  onShare() {
    this.clipboard.copy(window.location.href);
    this.snackBar.open('Indirizzo URL copiato', 'OK');
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

  getCommentiSTEP(luogo : any){
    return luogo['commenti'].filter((a:any) => a.fonte === 'step')
  }

  apriCommentoDialog(idLuogo: string){
    const dialogRef = this.dialog.open(AggiungiCommentoComponent, {
      maxWidth: '90vw',
      width: '90%',
      data: { idLuogo: idLuogo },
    });
  }

  eliminaCommento(commento : any){
    this.firestoreService.eliminaCommentoLuogo(commento, this.idLuogo!)
  }

  copiaCommento(fragment : string){
    //link senza hash
    const urlNoHash =  window.location.href.split("#")[0]
    this.clipboard.copy(urlNoHash + "#" + fragment)
    this.snackBar.open('Indirizzo URL commento copiato', 'OK');
  }

  eliminaEmozione(emozione : any){
    this.firestoreService.eliminaEmozione(this.idLuogo!,emozione)
  }
}

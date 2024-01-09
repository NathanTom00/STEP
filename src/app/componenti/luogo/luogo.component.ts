import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, mergeMap, toArray } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AggiungiEmozioniDialogComponent } from 'src/app/dialogs/aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';
import { LoginSignupDialogComponent } from 'src/app/dialogs/login-signup-dialog/login-signup-dialog.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';

@Component({
  selector: 'app-luogo',
  templateUrl: './luogo.component.html',
  styleUrls: ['./luogo.component.css'],
})
export class LuogoComponent implements OnInit {
  idLuogo: string | null = null;
  luogo$!: Observable<any>;
  nuoveAggiunte$!:Observable<any> | null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected authService: AuthService,
    private firestoreService: FirestoreService,
    private obiettiviService: ObiettiviService,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.idLuogo = this.route.snapshot.paramMap.get('id_luogo');

    this.luogo$ = this.firestoreService.getLuoghi().pipe(
      mergeMap((data) => data),
      filter((data: any) => data.id == this.idLuogo)
    );

    this.authService.currentUser$.subscribe(user => {
      if(!user)
        this.dialog.open(LoginSignupDialogComponent, {data: { singUpPage: false },});
    })
  }

  onShare() {}

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  esploraAnimaLocus(idLuogo: string, i: number) {
    //vai in luoghi/:idLuogo/:i
    this.router.navigate([`luoghi/${idLuogo}/${i}`])
  }

  getIconByName(nomeObiettivo: string) {
    for(let obiettivo of this.obiettiviService.getObiettivi()){
      if(obiettivo.nome===nomeObiettivo)
        return obiettivo.icon
    }

    return "";
  }

  aggiungiEmozione(idLuogo : string){
    const dialogRef = this.dialog.open(AggiungiEmozioniDialogComponent,{data: {idLuogo: idLuogo}})
    const dialogSubmitSubscription = dialogRef.componentInstance.nuoveAggiunte
   
  }
  
}

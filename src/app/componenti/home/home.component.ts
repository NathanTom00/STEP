import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, concatMap, map, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginSignupDialogComponent } from 'src/app/dialogs/login-signup-dialog/login-signup-dialog.component';
import { ProfileUser } from 'src/app/models/user-profile';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  emozioni = [
    'nostalgia',
    'gioia',
    'sorpresa',
    'meraviglia',
    'malinconia',
    'pace',
    'allegria',
    'speranza',
  ];
  emozioni_selezionati = [];
  luogo_evidenza: any;
  luoghi_scopri: any[] = [];
  tutti_luoghi: any[] = [];
  ready: boolean = false;
  emozioni_evidenza = ['nostalgia'];
  commenti: any[] = [];
  caricamento = true;
  emozioneSelezionato = ''
  luoghiByEmozione : any[] = []

  currentUser$ !: Observable<any>;
  test = true;
 
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
  cookieService: any;
  subscribeLuoghi : any =null;
  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    protected authService: AuthService,
    private userService : UserService
  ) {

    this.currentUser$ = userService.currentUserProfile$
  }



  ngOnInit(): void {
    //redirect test
    if (!this.test) {
      this.router.navigate(['onboarding']);
    } 

    //redirect with cookie -> per vedere se un utente ha già visitato il sito o meno usiamo un cookie
    /* 
      if (!this.cookieService.check("visitato")) {
        this.cookieService.set("visitato"," ")
        this.router.navigate(['onboarding']);
        return
      } 
      */

      this.subscribeLuoghi=this.firestoreService.getLuoghi().subscribe((data: any) => 
      {
        this.tutti_luoghi = data;
        let arr_luoghi_no_evidenza: any[] = [];
        for (let luogo of data) {
          if (luogo.id === 'rvAQISEhM3dUZ0jJFqUU')
            //per adesso forzo villa lante
            this.luogo_evidenza = luogo;
          else arr_luoghi_no_evidenza.push(luogo);
        }
        this.ready = true;
        //prende 3 items random e li mette in arr_luoghi_no_evidenza
        for (let i = 0; i < 3; i++) {
          var random_int = Math.round(
            Math.random() * (arr_luoghi_no_evidenza.length - 1)
          );
          this.luoghi_scopri.push(arr_luoghi_no_evidenza[random_int]);
          this.commenti.push(
            this.prendiCommentoPositivo(arr_luoghi_no_evidenza[random_int])
          );
          arr_luoghi_no_evidenza.splice(random_int, 1);
        }

        this.caricamento = false

        //console.log(this.commenti)

        //console.log(this.luoghi_scopri)
        //console.log(this.luogo_evidenza)
      });
  }

  prendiCommentoPositivo(luogo: any) {
    const arrCommenti = luogo.commenti;

    let item = arrCommenti[Math.floor(Math.random() * arrCommenti.length)];
    let ris = item;
    ris['luogo'] = luogo.nome;

    return ris;
  }

  onClick() {
    this.dialog.open(LoginSignupDialogComponent, {
      data: { singUpPage: true },
    });
  }

  selezionaChip(emozione: string) {
    
    if(this.emozioneSelezionato === emozione){
      this.emozioneSelezionato = ''
      return
    }

    this.emozioneSelezionato = emozione
    this.luoghiByEmozione = []
    this.firestoreService.getLuoghi().subscribe((data:any)=>{
      for(let luogo of data){
        if(luogo.emozioni.includes(this.emozioneSelezionato)){
          this.luoghiByEmozione.push(luogo)
        }
      }
    })
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }


  goToLuogo(idLuogo : string){
    this.router.navigate(['luoghi/'+idLuogo])
  }

  getTaskDaFare(taskFatti : any[],taskTotali : any[]){
    const nomiTaskFatti = taskFatti.map((data:any) => data.nome)
    let ris: any[] = []
    for(let task of taskTotali){
      if((!nomiTaskFatti.includes(task.nome)) && ris.length != 1)
        ris.push(task)
    }

    return ris
  }
}

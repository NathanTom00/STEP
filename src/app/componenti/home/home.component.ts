import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
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
  emozioni_selezionati=[]
  luogo_evidenza = {
    nome: '',
    descrizione: '',
    obiettivi: '',
    imm: ''
  };
  luoghi_scopri : any[] = [];
  emozioni_evidenza = ['nostalgia']
  /**
   * Cosa serve:
   * -luogo_evidenza oggetto che contiene nome_luogo,immagine , breve_descrizione, emozioni, anima locus icon e anima locus attività
   * -luoghi_da_esplorare con nome luogo, immagine e anima locus icon
   * -una lista di commenti con etichette e nome del luogo commentato
   */
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

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.firestoreService.getLuoghi().subscribe((data:any)=>{
      let arr_luoghi_no_evidenza : any[]= [];
      for(let luogo of data){
        
        if(luogo.id === "bWtG2oRcYRbVosdn9IUh")
          this.luogo_evidenza = luogo
        else
          arr_luoghi_no_evidenza.push(luogo)
      }

      for (let i = 0; i < 3; i++) {
        var random_int = Math.round(Math.random()*(arr_luoghi_no_evidenza.length -1));
        this.luoghi_scopri.push(arr_luoghi_no_evidenza[random_int]);
        arr_luoghi_no_evidenza.splice(random_int, 1);
     }


     console.log(this.luoghi_scopri)
     console.log(this.luogo_evidenza)
    })
  }

  onClick() {}

  selezionaChip(emozione : string){

  }

  toCap(stringa : string){
    return stringa[0].toUpperCase() + stringa.substring(1)
  }
}

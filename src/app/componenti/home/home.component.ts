import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  emozioni = ['Nostalgia','Gioia','Relax','Inspirazione','Tag','Tag','Tag','Prova']
  emozioni_evidenza = ['Relax','Inspirazione']
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
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    }
  }

  constructor(private router : Router){}

  onClick(){
  }
}

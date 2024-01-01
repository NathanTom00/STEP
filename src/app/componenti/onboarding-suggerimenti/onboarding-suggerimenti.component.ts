import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-onboarding-suggerimenti',
  templateUrl: './onboarding-suggerimenti.component.html',
  styleUrls: ['./onboarding-suggerimenti.component.css']
})
export class OnboardingSuggerimentiComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
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

  luoghi_selezionati = [
    {
      nome: "Paesaggio di Civita di Bagnoreggio",
      immagine_link: "../../../assets/bagnoreggio.jpg",
      descrizione: "Visitare Bagnoregio è sicuramente una delle esperienze più entusiasmanti che è possibile fare nel territorio della Tuscia.",
      obiettivi: ["pace","evasione"],
      anima_locus_icons: ["image"],
      codice: "bagn_reg",
    },
    {
      nome: "Parco dei mostri di Bomarzo",
      immagine_link: "../../../assets/parco dei mostri.jpg",
      descrizione: `Il Parco dei Mostri, noto anche con il nome Sacro Bosco di Bomarzo, fu ideato dall'architetto Pirro Ligorio (completò San Pietro dopo la morte di Michelangelo) su commissione del Principe Pier Francesco Orsini, detto Vicino, allo scopo di "sol per sfogare il core" rotto (?) per la morte della moglie Giulia Farnese.`,
      obiettivi: ["relax","curiosità"],
      anima_locus_icons: ["image"],
      codice: "parc_mostr",
    }    
  ]


  constructor () {}

  onClickScopri(codiceLuogo : string){
    alert(codiceLuogo)
  }

  firstLetterUpper(stringa : string){
    return stringa[0].toUpperCase() + stringa.substring(1).toLocaleLowerCase();
  }

}

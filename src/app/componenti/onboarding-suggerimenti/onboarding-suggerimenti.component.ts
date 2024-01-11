import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OnboardingService } from 'src/app/servizi/onboarding.service';

@Component({
  selector: 'app-onboarding-suggerimenti',
  templateUrl: './onboarding-suggerimenti.component.html',
  styleUrls: ['./onboarding-suggerimenti.component.css']
})
export class OnboardingSuggerimentiComponent implements OnInit{

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

  luoghiSelezionati : any[] = []
  len : any
  constructor (protected onboardingService : OnboardingService,private router: Router,private cookieService : CookieService) {
  }

  ngOnInit(): void {

    //se sto qui ma gli obiettivi selezionati non sono presenti allora ritorno all'onboarding
    if(this.onboardingService.obiettiviSelezionati.length == 0){
      this.router.navigate(['onboarding'])
    }
    this.onboardingService.cercaLuoghiPerObiettivi().subscribe((data:any) => {
      
      for (let i = 0; i < 3; i++) {
        var random_int = Math.round(Math.random()*(data.length -1));
        this.luoghiSelezionati.push(data[random_int]);
        data.splice(random_int, 1);
     }
      //this.luoghiSelezionati = data
      this.len = Object.keys(this.luoghiSelezionati).length
    })
  }

  onClickScopri(codiceLuogo : string){
    this.cookieService.set('visitato', ' ');
    this.router.navigate(['luoghi/'+codiceLuogo])
  }

  firstLetterUpper(stringa : string){
    return stringa[0].toUpperCase() + stringa.substring(1).toLocaleLowerCase();
  }

}

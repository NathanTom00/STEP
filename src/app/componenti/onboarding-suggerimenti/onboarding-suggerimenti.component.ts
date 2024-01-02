import { Component, OnInit } from '@angular/core';
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

  luoghiSelezionati : any
  len : any
  constructor (protected onboardingService : OnboardingService) {
  }

  ngOnInit(): void {
    this.onboardingService.cercaLuoghiPerObiettivi().subscribe((data:any) => {
      this.luoghiSelezionati = data
      this.len = Object.keys(this.luoghiSelezionati).length
    })
  }

  onClickScopri(codiceLuogo : string){
    alert(codiceLuogo)
  }

  firstLetterUpper(stringa : string){
    return stringa[0].toUpperCase() + stringa.substring(1).toLocaleLowerCase();
  }

}

import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrObiettiviComponent } from 'src/app/dialogs/err-obiettivi/err-obiettivi.component';

@Component({
  selector: 'app-onboarding-obiettivi',
  templateUrl: './onboarding-obiettivi.component.html',
  styleUrls: ['./onboarding-obiettivi.component.css'],
})
export class OnboardingObiettiviComponent implements OnInit {
  emozioni = [
    'scoprire cose nuove',
    "approfondire temi d'interesse",
    'solitudine',
    'pace',
    'ispirazione',
    'avventura',
    'evasione',
    'libertà',
    'curiosità',
    'relax',
    'divertimento',
    'migliorare le proprie relazioni',
    'tempo per me stesso',
    'energia',
    'riconnettermi con me stesso',
  ];

  emozioniSelezionati: string[] = [];

  constructor(private router: Router,private route : ActivatedRoute,private dialog : MatDialog){}

  ngOnInit(): void {}

  onClick(buttonMat: MatButton) {
    let button = buttonMat._elementRef.nativeElement;
    let emozione: string = button.value;
    if (this.emozioniSelezionati.includes(emozione)) {
      button.classList.remove('selected');
      this.emozioniSelezionati = this.emozioniSelezionati.filter((item : string) => item !== emozione)
    } else {
      button.classList.add('selected');
      this.emozioniSelezionati.push(emozione)
    }
    /*console.log(button.classList);
    console.log(this.emozioniSelezionati)*/
  }

  onSubmit() {
    if(this.emozioniSelezionati.length != 3){
      this.dialog.open(ErrObiettiviComponent)
      return
    }

    this.router.navigate(['./suggerimenti'],{relativeTo: this.route})
    
  }
}

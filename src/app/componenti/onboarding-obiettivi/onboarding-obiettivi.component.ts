import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';

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

  ngOnInit(): void {}

  onSubmit() {}
}

import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrObiettiviComponent } from 'src/app/dialogs/err-obiettivi/err-obiettivi.component';

@Component({
  selector: 'app-onboarding-obiettivi',
  templateUrl: './onboarding-obiettivi.component.html',
  styleUrls: ['./onboarding-obiettivi.component.css'],
})
export class OnboardingObiettiviComponent implements OnInit {

  iconLink = "../../../assets/Icons/"
  emozioni = [
    {nome: 'scoprire cose nuove',icon: `${this.iconLink}scoprire-cose-nuove-icon.svg`},
    {nome: "approfondire temi d'interesse", icon: `${this.iconLink}temi-interesse.svg`},
    {nome: 'solitudine', icon: `${this.iconLink}solitudine.svg`},
    {nome: 'pace', icon: `${this.iconLink}pace.svg`},
    {nome: 'ispirazione', icon: `${this.iconLink}ispirazione.svg`},
    {nome: 'avventura', icon: `${this.iconLink}avventura.svg`},
    {nome: 'evasione', icon: `${this.iconLink}evasione.svg`},
    {nome: 'libertà', icon: `${this.iconLink}libertà.svg`},
    {nome: 'curiosità', icon: `${this.iconLink}curiosità.svg`},
    {nome: 'relax', icon: `${this.iconLink}relax.svg`},
    {nome: 'divertimento', icon: `${this.iconLink}divertimento.svg`},
    {nome: 'migliorare le mie relazioni', icon: `${this.iconLink}relazioni.svg`},
    {nome: 'tempo per me stesso', icon: `${this.iconLink}tempo.svg`},
    {nome: 'energia', icon: `${this.iconLink}energia.svg`},
    {nome: 'riconnettermi con me stesso', icon: `${this.iconLink}riconnettermi.svg`}
  ]

  emozioniSelezionati: string[] = [];

  constructor(private router: Router,private route : ActivatedRoute,private dialog : MatDialog){
  }

  ngOnInit(): void {}

  /**
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
    console.log(button.classList);
    console.log(this.emozioniSelezionati)
  } */

  onClick(button : HTMLButtonElement){
    let emozione: string = button.value;
    if (this.emozioniSelezionati.includes(emozione)) {
      button.classList.remove('selected');
      this.emozioniSelezionati = this.emozioniSelezionati.filter((item : string) => item !== emozione)
    } else {
      button.classList.add('selected');
      this.emozioniSelezionati.push(emozione)
    }
  }

  onSubmit() {
    if(this.emozioniSelezionati.length != 3){
      this.dialog.open(ErrObiettiviComponent)
      return
    }

    this.router.navigate(['./suggerimenti'],{relativeTo: this.route})
    
  }
}

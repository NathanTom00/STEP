import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrObiettiviComponent } from 'src/app/dialogs/err-obiettivi/err-obiettivi.component';
import { ObiettiviService } from 'src/app/servizi/obiettivi.service';
import { OnboardingService } from 'src/app/servizi/onboarding.service';

@Component({
  selector: 'app-onboarding-obiettivi',
  templateUrl: './onboarding-obiettivi.component.html',
  styleUrls: ['./onboarding-obiettivi.component.css'],
})
export class OnboardingObiettiviComponent implements OnInit {
  obiettiviSelezionati: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private onboardingService: OnboardingService,
    private obiettiviService: ObiettiviService
  ) {}

  ngOnInit(): void {}

  getObiettivi() {
    return this.obiettiviService.getObiettivi();
  }

  onClick(button: HTMLButtonElement) {
    let obiettivo: string = button.value;
    if (this.obiettiviSelezionati.includes(obiettivo)) {
      button.classList.remove('selected');
      this.obiettiviSelezionati = this.obiettiviSelezionati.filter(
        (item: string) => item !== obiettivo
      );
    } else {
      button.classList.add('selected');
      this.obiettiviSelezionati.push(obiettivo);
    }
  }

  onSubmit() {
    if (this.obiettiviSelezionati.length != 3) {
      this.dialog.open(ErrObiettiviComponent, {
        maxWidth: '90vw',
        width: '90%',
      });
      return;
    }
    this.onboardingService.setObiettiviSelezionati(this.obiettiviSelezionati);
    this.router.navigate(['./suggerimenti'], { relativeTo: this.route });
  }
}

import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AggiungiAnimaComponent } from 'src/app/dialogs/aggiungi-anima/aggiungi-anima.component';
import { ZoomInImgComponent } from 'src/app/dialogs/zoom-in-img/zoom-in-img.component';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-anima-locus',
  templateUrl: './anima-locus.component.html',
  styleUrls: ['./anima-locus.component.css'],
})
export class AnimaLocusComponent implements OnInit {
  idLuogo: string | null = null;
  iObiettivo: string | null = null;
  luogoSelezionato: any;
  obiettivoSelezionato!: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestoreService: FirestoreService,
    protected authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.idLuogo = this.route.snapshot.paramMap.get('id_luogo');
    if (
      !this.route.snapshot.paramMap.get('iObiettivo') ||
      this.idLuogo === null
    ) {
      this.router.navigate(['home']);
    }

    this.iObiettivo = this.route.snapshot.paramMap.get('iObiettivo');
    this.firestoreService.getLuoghi().subscribe((luoghi: any) => {
      for (let luogo of luoghi) {
        if (luogo.id === this.idLuogo) {
          this.obiettivoSelezionato = luogo.obiettivi[this.iObiettivo!];
        }
      }

      //console.log(this.obiettivoSelezionato);
    });
  }

  toCap(stringa: string) {
    return stringa[0].toUpperCase() + stringa.substring(1);
  }

  openDialog() {
    this.dialog.open(AggiungiAnimaComponent, {
      data: {
        maxWidth: '90vw',
        width: '90%',
        idLuogo: this.idLuogo,
        iObiettivo: this.iObiettivo,
      },
    });
  }

  navTo(link: string) {
    window.location.href = link;
  }

  zoomImm(src: string) {
    this.dialog.open(ZoomInImgComponent, {
      maxWidth: '90vw',
      width: '90%',
      data: { src: src },
    });
  }
}

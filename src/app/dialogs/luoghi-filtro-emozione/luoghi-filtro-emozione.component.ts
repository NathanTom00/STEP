import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-luoghi-filtro-emozione',
  templateUrl: './luoghi-filtro-emozione.component.html',
  styleUrls: ['./luoghi-filtro-emozione.component.css'],
})
export class LuoghiFiltroEmozioneComponent implements OnInit{
  idLuoghiDaCercare: string[] = [];
  luoghiFiltrati : any [] = [];
  caricamento = true;

  constructor(
    public dialogRef: MatDialogRef<LuoghiFiltroEmozioneComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firestoreService : FirestoreService,
    private router : Router
  ) {
    this.idLuoghiDaCercare = data.luoghi
  }

  ngOnInit(): void {
    this.firestoreService.getLuoghi().subscribe((luoghi: any) => {

      this.luoghiFiltrati = []
      for(let luogo of luoghi){
        if(this.idLuoghiDaCercare.includes(luogo.id)){
          this.luoghiFiltrati.push(luogo)
        }
      }


      this.caricamento = false
    })
  }


  goToLuogo(idLuogo: string) {
    this.router.navigate(['luoghi/' + idLuogo]);
    this.dialogRef.close()
  }

}

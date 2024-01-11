import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servizi/firestore.service';

@Component({
  selector: 'app-cerca-mappa',
  templateUrl: './cerca-mappa.component.html',
  styleUrls: ['./cerca-mappa.component.css']
})
export class CercaMappaComponent {

  provinciaSelezionata = ''
  luoghiSelezionati :  any[] = []
  constructor(private firestoreService:FirestoreService,private router : Router,public dialogRef: MatDialogRef<CercaMappaComponent>){}

  clickProvincia(stringProvincia: string){
    this.luoghiSelezionati = []
    this.provinciaSelezionata = stringProvincia
    this.firestoreService.getLuoghi().subscribe((data:any)=>{
      for(let luogo of data){
        if(luogo.provincia === this.provinciaSelezionata){
          this.luoghiSelezionati.push(luogo)
        }
      }

      //console.log(this.luoghiSelezionati)
    })
  }

  nav(idLuogo : string){
    this.router.navigate(['luoghi/'+idLuogo])
    this.dialogRef.close()
  }
}

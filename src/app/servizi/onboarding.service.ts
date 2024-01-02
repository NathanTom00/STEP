import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, filter, map, tap } from 'rxjs';
import { ObiettiviService } from './obiettivi.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  obiettivi : {}[];
  obiettiviSelezionati : string[]= []

  constructor(private firestore: Firestore, private obiettiviService : ObiettiviService) {
    this.obiettivi = obiettiviService.obiettivi
  }

  getObiettivi(){
    return this.obiettivi
  }

  setObiettiviSelezionati(arr : string[]){
    this.obiettiviSelezionati = arr
  }

  getObiettiviSelezionati(){
    return this.obiettiviSelezionati
  }


  cercaLuoghiPerObiettivi(){
    const collezioneLuoghi = collection(this.firestore, 'luogo');
    return collectionData(collezioneLuoghi, { idField: 'id'}).pipe(
      map((luoghi:any[]) => {
        //ritorna i luoghi del db che hanno incluso uno dei 3 obiettivi selezionati
        return luoghi.filter((luogo:any) => this.obiettiviSelezionati.some(obiettivo => luogo.obiettivi.includes(obiettivo)))
      })
    )
  }
}

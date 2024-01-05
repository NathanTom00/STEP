import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  obiettiviSelezionati : string[]= []

  constructor(private firestore: Firestore) {
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
        return luoghi.filter((luogo:any) => {
          for(let obiettivo of luogo.obiettivi){
            if(this.obiettiviSelezionati.includes(obiettivo.nome))
              return true
          }

          return false
        })
      })
    )
  }
  
}

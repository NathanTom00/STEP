import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  iconLink = "../../../assets/Icons/"
  obiettivi = [
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


  obiettiviSelezionati : string[]= []

  constructor(private firestore: Firestore) {}

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
    //prendo la lista di tutti i luoghi sul firestore
    const collezioneLuoghi = collection(this.firestore, 'luogo');
    /**
    collectionData(collezioneLuoghi).subscribe((luoghi:any) => {
      console.log(this.obiettiviSelezionati)
      for(let luogo of luoghi){
        if(this.obiettiviSelezionati.some(obiettivo => luogo.obiettivi.includes(obiettivo))){
          
          console.log(luogo)
        }
      }
    })
     */

    return collectionData(collezioneLuoghi, { idField: 'id'}).pipe(
      map((luoghi:any[]) => {
        return luoghi.filter((luogo:any) => this.obiettiviSelezionati.some(obiettivo => luogo.obiettivi.includes(obiettivo)))
      })
    )
  }
}

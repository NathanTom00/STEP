import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LuoghiService {

  constructor(private firestore: Firestore) { }

  getLuoghi(){
    const collezioneLuoghi = collection(this.firestore, 'luogo');
    return collectionData(collezioneLuoghi, { idField: 'id'})
  }
}

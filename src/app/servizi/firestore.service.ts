
import { Injectable } from '@angular/core';
import { FieldPath, Firestore, collection, collectionData, limit, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }


  getLuoghi(){
    const refCollection = collection(this.firestore,'luogo')
    return collectionData(refCollection, { idField: 'id'})
  }
}

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getLuoghi(){
    const refCollection = collection(this.firestore,'luogo')

    return collectionData(refCollection, { idField: 'id'})
  }

  getCommentByIDLuogo(idLuogo:string){
    
  }
}

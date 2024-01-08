
import { Injectable } from '@angular/core';
import { FieldPath, Firestore, collection, collectionData, doc, getDoc, limit, query, where } from '@angular/fire/firestore';
import { FieldValue, arrayUnion, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }


  getLuoghi(){
    const refCollection = collection(this.firestore,'luogo')
    return collectionData(refCollection, { idField: 'id'})
  }

  aggiungiEmozioni(idLuogo : string, emozioni:string[]){
    const refCollection = collection(this.firestore,'luogo')
    
    const emozioniRef = doc(this.firestore,'luogo',idLuogo)
    
    updateDoc(emozioniRef,{emozioni : arrayUnion(...emozioni)})
  }
}

import { Injectable } from '@angular/core';
import {
  FieldPath,
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from '@angular/fire/firestore';
import { FieldValue, QueryConstraint, arrayUnion, orderBy, updateDoc } from 'firebase/firestore';
import { Storage, deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private firestore: Firestore,
    private readonly storage: Storage
  ) {}

  getLuoghi() {
    const refCollection = collection(this.firestore, 'luogo');
    return collectionData(refCollection, { idField: 'id' });
  }

  getLuoghiLimitato(){
    const refCollection = collection(this.firestore, 'luogo');
    const refQuery = query(refCollection,limit(3))
    return collectionData(refQuery, { idField: 'id' });
  }


  getLuogoById(idLuogo: string) {
    
    const refCollection = collection(this.firestore, 'luogo');
    const luogoRef = doc(this.firestore, 'luogo', idLuogo);
    return of(getDoc(luogoRef));
  }


  aggiungiEmozioni(idLuogo: string, emozioni: string[]) {
    const refCollection = collection(this.firestore, 'luogo');

    const emozioniRef = doc(this.firestore, 'luogo', idLuogo);

    updateDoc(emozioniRef, { emozioni: arrayUnion(...emozioni) });
  }

  async uploadImm(idLuogo: string, iObiettivo: string, file: File) {
    if (!file) return;

    const storageRef = ref(this.storage, '/animalocus_imm/'+file.name);
    let uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    
    const immURL = await getDownloadURL(uploadTask.snapshot.ref);

    const refCollection = collection(this.firestore, 'luogo');

    const luogoRef = doc(this.firestore, 'luogo', idLuogo);
    const documento = (await getDoc(doc(this.firestore, 'luogo', idLuogo))).data()
    
    const obiettivi = documento!['obiettivi']
    obiettivi[iObiettivo].container.push({tipo: 'imm',link : immURL})
    //console.log(obiettivi)
    updateDoc(luogoRef, { obiettivi: obiettivi});
  }

  async uploadLink(idLuogo: string, iObiettivo: string,titolo:string,link:string){
    const refCollection = collection(this.firestore, 'luogo');
    const luogoRef = doc(this.firestore, 'luogo', idLuogo);
    const documento = (await getDoc(doc(this.firestore, 'luogo', idLuogo))).data()
    
    const obiettivi = documento!['obiettivi']
    obiettivi[iObiettivo].container.push({tipo: 'link',titolo : titolo,link: link})
    console.log(obiettivi)
    updateDoc(luogoRef, { obiettivi: obiettivi});
  }

  getClassifica(){
    const refCollection = collection(this.firestore, 'users')
    const refQuery = query(refCollection,orderBy('livello'))
    return collectionData(refQuery, { idField: 'id' });
  }

  modificaLuogo(idLuogo: string,luogo : any,immLinkDaModificare : string[]){
    let storageRef;
    for(let immLink of immLinkDaModificare){
      console.log(immLink)
      storageRef = ref(this.storage,immLink)
      deleteObject(storageRef)
    }
    const refCollection = collection(this.firestore, 'luogo');
    const luogoRef = doc(this.firestore, 'luogo', idLuogo);
    updateDoc(luogoRef,luogo)
  }
}

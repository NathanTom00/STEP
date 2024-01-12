import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { Observable } from 'rxjs/internal/Observable';
import { from, of, switchMap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { arrayUnion, collection, getDoc } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  constructor(private firestore: Firestore, private authService: AuthService,private snackBar: MatSnackBar) {}

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }

  async incrementaCountLuoghi(user: any) {

    const userRef = doc(this.firestore, 'users', user?.uid);
    let documento = (await getDoc(doc(this.firestore, 'users', user?.uid))).data()

    if(documento!['count_luoghi_esplorati']+1 == 3){
      //devo aggiungere la task Traveller in taskFatti, aggiungere il badge e incrementare il livello e fare uno snackbar
      let taskFatta = {nome: 'Traveller',descrizione: 'Esplora 3 luoghi', data: Date.now()}
      this.snackBar.open('Challenge Completata: Traveller!','OK',{duration: 10000})
      
      updateDoc(userRef,{taskFatti: arrayUnion(taskFatta), badges: arrayUnion('Traveller'), livello: documento!['livello']+1})
    }

    if(documento!['count_luoghi_esplorati']+1 == 5){
      //devo aggiungere la task Traveller in taskFatti, aggiungere il badge e incrementare il livello e fare uno snackbar
      let taskFatta = {nome: 'Traveller level 2',descrizione: 'Esplora 5 luoghi', data: Date.now()}
      this.snackBar.open('Challenge Completata: Traveller!','OK',{duration: 10000})
      
      updateDoc(userRef,{taskFatti: arrayUnion(taskFatta), badges: arrayUnion('Traveller level 2'), livello: documento!['livello']+1})
    }

    updateDoc(userRef, { count_luoghi_esplorati: documento!['count_luoghi_esplorati']+1});
  }


}

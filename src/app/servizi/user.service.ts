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

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

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
    let documento = (
      await getDoc(doc(this.firestore, 'users', user?.uid))
    ).data();

    if (documento!['count_luoghi_esplorati'] + 1 == 3) {
      //devo aggiungere la task Traveller in taskFatti, aggiungere il badge e incrementare il livello e fare uno snackbar
      let taskFatta = {
        nome: 'Traveller',
        descrizione: 'Esplora 3 luoghi',
        data: Date.now(),
      };
      this.snackBar.open('Challenge Completata: Traveller!', 'OK', {
        duration: 10000,
      });

      updateDoc(userRef, {
        taskFatti: arrayUnion(taskFatta),
        badges: arrayUnion('Traveller'),
        livello: documento!['livello'] + 1,
      });
    }

    if (documento!['count_luoghi_esplorati'] + 1 == 5) {
      //devo aggiungere la task Traveller in taskFatti, aggiungere il badge e incrementare il livello e fare uno snackbar
      let taskFatta = {
        nome: 'Traveller level 2',
        descrizione: 'Esplora 5 luoghi',
        data: Date.now(),
      };
      this.snackBar.open('Challenge Completata: Traveller!', 'OK', {
        duration: 10000,
      });

      updateDoc(userRef, {
        taskFatti: arrayUnion(taskFatta),
        badges: arrayUnion('Traveller level 2'),
        livello: documento!['livello'] + 1,
      });
    }

    updateDoc(userRef, {
      count_luoghi_esplorati: documento!['count_luoghi_esplorati'] + 1,
    });
  }

  async aggiungiEmozione(user: any, emozioni: string[]) {
    const userRef = doc(this.firestore, 'users', user?.uid);
    let documento = (
      await getDoc(doc(this.firestore, 'users', user?.uid))
    ).data();

    for (let emozione of emozioni) {
      //aggiungo in documento l'emozione
      if (!documento!['emozioni_cercati'].includes(emozione)) {
        documento!['emozioni_cercati'].push(emozione);
      }

      //se in documento non ho in taskFatti la task "Because I'm happy" e l'emozione passato è gioia allora devo aggiungerla nei task fatti, devo livellare e mettere il badge
      if ( emozione === 'gioia' && !documento!['taskFatti'].map((task: any) => task.nome).includes("Because I'm happy") ) {
        documento!['taskFatti'].push({
          nome: "Because I'm happy",
          descrizione: 'Cerca gioia',
          data: Date.now(),
        });

        documento!['badges'].push("Because I'm happy");
        this.snackBar.open("Challenge Completata: Because I'm happy!", 'OK', {
          duration: 10000,
        });
        
        documento!['livello']++;
      }
    }

    updateDoc(userRef, documento!);
  }

  async incrementaCountObiettiviEsplorati(user: any){
    const userRef = doc(this.firestore, 'users', user?.uid);
    let documento = (
      await getDoc(doc(this.firestore, 'users', user?.uid))
    ).data();

    documento!['count_obiettivi_esplorati']++

    //se il count == 1 e non è completato la task "Soul search" allora lo completo, aggiungendolo ai task fatti, livellando e mettere il badge
    if(documento!['count_obiettivi_esplorati'] == 1 && !documento!['taskFatti'].map((task: any) => task.nome).includes("Soul search")){
      documento!['taskFatti'].push({
        nome: "Soul search",
        descrizione: "Esplora un'anima locus",
        data: Date.now(),
      });

      documento!['badges'].push("Soul search");

        this.snackBar.open("Challenge Completata: Soul search!", 'OK', {
          duration: 10000,
        });
        
      documento!['livello']++;
    }

    updateDoc(userRef, documento!);
  }


  async incrementaEmozioniAggiunti(user:any,numEmozioniAggiunti : number){
    const userRef = doc(this.firestore, 'users', user?.uid);
    let documento = (
      await getDoc(doc(this.firestore, 'users', user?.uid))
    ).data();

    documento!['count_emozioni_aggiunti'] += numEmozioniAggiunti

    //se count_emozioni_aggiunti maggiore di 1 e taskFatti non ha "Getting emotional" allora devo aggiungerlo su taskFatti, livellare e mettere il badge
    if(documento!['count_emozioni_aggiunti'] >= 1 && !documento!['taskFatti'].map((task: any) => task.nome).includes("Getting emotional")){
      documento!['taskFatti'].push({
        nome: "Getting emotional",
        descrizione: "Esplora un'anima locus",
        data: Date.now(),
      });

      documento!['badges'].push("Getting emotional");

        this.snackBar.open("Challenge Completata: Getting emotional!", 'OK', {
          duration: 10000,
        });
        
      documento!['livello']++;
    }

    updateDoc(userRef, documento!);
  }
}

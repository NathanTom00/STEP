import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { catchError, from, map, mergeMap, of, throwError } from 'rxjs';
import { FirestoreService } from '../servizi/firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth,private firestoreService:FirestoreService) {}

  currentUser$ = authState(this.auth)

  isLogged(){
    return user(this.auth).pipe(
      map((data:any) => {
        if(data)
          return true
        else
          return false
      })
    )
  }
  signUp(email: string, pass: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, pass));
  }

  logIn(email: string, pass: string) {
    return from(signInWithEmailAndPassword(this.auth, email, pass)).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  signOut() {
    signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }
  
  passDimenticata(email : string){
    return of(sendPasswordResetEmail(this.auth,email))
  }
 
}

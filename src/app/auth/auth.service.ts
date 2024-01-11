import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { catchError, from, map, mergeMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

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
}

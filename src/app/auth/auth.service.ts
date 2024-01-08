import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { catchError, from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  isLogged(): boolean {
    return this.auth.currentUser ? true : false;
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

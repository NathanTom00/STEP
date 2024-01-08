import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Step_Proj';

  test = false;
  constructor(private router: Router,private cookieService : CookieService,private auth: Auth,protected authService : AuthService) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  

  doLogout(){
    this.authService.signOut()
    location.reload()
  }
}

//ng serve --host 0.0.0.0
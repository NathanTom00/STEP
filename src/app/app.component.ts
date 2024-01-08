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
export class AppComponent implements OnInit {
  title = 'Step_Proj';

  test = true;
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

  ngOnInit(): void {
    //redirect test
    if (this.test) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['onboarding']);
    }

    //redirect with cookie
    /*
    if (this.cookieService.check("visitato")) {
      this.router.navigate(['home']);
    } else {
      this.cookieService.set("visitato"," ")
      this.router.navigate(['onboarding']);
    }
    */
  }

  doLogout(){
    this.authService.signOut()
    location.reload()
  }
}

//ng serve --host 0.0.0.0
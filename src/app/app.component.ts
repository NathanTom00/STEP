import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { LoginSignupDialogComponent } from './dialogs/login-signup-dialog/login-signup-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProfileUser } from './models/user-profile';
import { UserService } from './servizi/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('drawer') sidenav!: MatSidenav;
  title = 'Step_Proj';

  currentUser$ : Observable<ProfileUser|null>;
  constructor(private router: Router,private auth: Auth,protected authService : AuthService,private dialog:MatDialog,private userService : UserService) {
    this.currentUser$ = userService.currentUserProfile$
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

  openMenu(){
    this.sidenav.open()
  }
  

  async doLogout(){
    const out = this.authService.signOut()
    await out
    this.sidenav.close()
    location.reload()
    
  }

  nav(indirizzo : string){
    this.router.navigate([indirizzo])
    this.sidenav.close()
  }

  doLogIn(){
    this.sidenav.close()
    this.dialog.open(LoginSignupDialogComponent, {data: { singUpPage: 'login' },});
  }

}

//ng serve --host 0.0.0.0
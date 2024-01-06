import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Step_Proj';

  test = true;
  constructor(private router: Router,private cookieService : CookieService) {}

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
}

//ng serve --host 0.0.0.0
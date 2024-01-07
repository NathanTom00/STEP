import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
/**
 * Componenti
 */
import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { ErrObiettiviComponent } from './dialogs/err-obiettivi/err-obiettivi.component';
import { LuogoComponent } from './componenti/luogo/luogo.component';
import { OnboardingObiettiviComponent } from './componenti/onboarding-obiettivi/onboarding-obiettivi.component';
import { OnboardingSuggerimentiComponent } from './componenti/onboarding-suggerimenti/onboarding-suggerimenti.component';

/**
 * Forms
 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * HttpClient
 */
import {HttpClientModule} from '@angular/common/http'

/**
 * Carousel
 */
import { CarouselModule } from 'ngx-owl-carousel-o'; 

/**
 * Cookie Service
 */
import {CookieService} from 'ngx-cookie-service';

/**
 * Icons
 */
import { AngularSvgIconModule } from 'angular-svg-icon';

/**
 * Firebase
 */
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

/**
 * Material
 */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import { OnboardingComponent } from './componenti/onboarding/onboarding.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { StarRatingModule } from 'angular-star-rating';
import { LoginSignupDialogComponent } from './dialogs/login-signup-dialog/login-signup-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnboardingComponent,
    OnboardingObiettiviComponent,
    OnboardingSuggerimentiComponent,
    LuogoComponent,
    ErrObiettiviComponent,
    LoginSignupDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    StarRatingModule.forRoot(),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CarouselModule,
    MatGridListModule,
    MatDialogModule,
    MatRippleModule,
    MatSidenavModule,
    FontAwesomeModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

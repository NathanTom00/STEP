import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
 * Material
 */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OnboardingComponent } from './componenti/onboarding/onboarding.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnboardingComponent,
    OnboardingObiettiviComponent,
    OnboardingSuggerimentiComponent,
    LuogoComponent,
    ErrObiettiviComponent,
    
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
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CarouselModule,
    MatGridListModule,
    MatDialogModule,
    MatRippleModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

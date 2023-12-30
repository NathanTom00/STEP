import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenti/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
 * Material
 */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { OnboardingComponent } from './componenti/onboarding/onboarding.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { OnboardingObiettiviComponent } from './componenti/onboarding-obiettivi/onboarding-obiettivi.component';
import { OnboardingSuggerimentiComponent } from './componenti/onboarding-suggerimenti/onboarding-suggerimenti.component';
import { LuogoComponent } from './componenti/luogo/luogo.component';
import {MatGridListModule} from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OnboardingComponent,
    OnboardingObiettiviComponent,
    OnboardingSuggerimentiComponent,
    LuogoComponent,
    
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
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    CarouselModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';


import { StarRatingModule } from 'angular-star-rating';
import { LoginSignupDialogComponent } from './dialogs/login-signup-dialog/login-signup-dialog.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AggiungiEmozioniDialogComponent } from './dialogs/aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';
import { AngularFireModule } from "@angular/fire/compat";
import { AnimaLocusComponent } from './componenti/anima-locus/anima-locus.component';
import { AggiungiAnimaComponent } from './dialogs/aggiungi-anima/aggiungi-anima.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ZoomInImgComponent } from './dialogs/zoom-in-img/zoom-in-img.component';
import { CercaComponent } from './componenti/cerca/cerca.component';
import { CercaTagsComponent } from './dialogs/cerca-tags/cerca-tags.component';
import { ProfiloUserComponent } from './componenti/profilo-user/profilo-user.component';
import { CercaMappaComponent } from './dialogs/cerca-mappa/cerca-mappa.component';
import { LeaderboardComponent } from './componenti/leaderboard/leaderboard.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { DatePipe } from "@angular/common";
import { ModificaLuogoViewComponent } from './componenti/modifica-luogo-view/modifica-luogo-view.component';
import { ModificaLuogoComponent } from './componenti/modifica-luogo/modifica-luogo.component';
import { ModificaObiettivoDialogComponent } from './dialogs/modifica-obiettivo-dialog/modifica-obiettivo-dialog.component';
import { AggiungiObiettivoLuogoComponent } from './dialogs/aggiungi-obiettivo-luogo/aggiungi-obiettivo-luogo.component';
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
    AggiungiEmozioniDialogComponent,
    AnimaLocusComponent,
    AggiungiAnimaComponent,
    ZoomInImgComponent,
    CercaComponent,
    CercaTagsComponent,
    ProfiloUserComponent,
    CercaMappaComponent,
    LeaderboardComponent,
    DashboardComponent,
    ModificaLuogoViewComponent,
    ModificaLuogoComponent,
    ModificaObiettivoDialogComponent,
    AggiungiObiettivoLuogoComponent,
    
  ],
  imports: [
    BrowserModule,
    AngularFireModule,
    RouterModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    StarRatingModule.forRoot(),
    NgxMatFileInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatBadgeModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ClipboardModule,
    MatChipsModule,
    CarouselModule,
    MatGridListModule,
    MatDialogModule,
    MatRippleModule,
    MatSidenavModule,
    FontAwesomeModule
  ],
  providers: [
    CookieService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

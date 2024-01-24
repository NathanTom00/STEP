import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { OnboardingObiettiviComponent } from './componenti/onboarding-obiettivi/onboarding-obiettivi.component';
import { OnboardingSuggerimentiComponent } from './componenti/onboarding-suggerimenti/onboarding-suggerimenti.component';
import { OnboardingComponent } from './componenti/onboarding/onboarding.component';
import { LuogoComponent } from './componenti/luogo/luogo.component';
import { AnimaLocusComponent } from './componenti/anima-locus/anima-locus.component';
import { CercaComponent } from './componenti/cerca/cerca.component';
import { ProfiloUserComponent } from './componenti/profilo-user/profilo-user.component';
import { authGuard } from './auth/auth.guard';
import { LeaderboardComponent } from './componenti/leaderboard/leaderboard.component';
import { DashboardComponent } from './componenti/dashboard/dashboard.component';
import { ModificaLuogoViewComponent } from './componenti/modifica-luogo-view/modifica-luogo-view.component';
import { ModificaLuogoComponent } from './componenti/modifica-luogo/modifica-luogo.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onboarding/obiettivi/suggerimenti',component: OnboardingSuggerimentiComponent},
  {path: 'onboarding/obiettivi',component: OnboardingObiettiviComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: 'luoghi/:id_luogo/:iObiettivo', component: AnimaLocusComponent},
  {path: 'luoghi/:id_luogo', component: LuogoComponent},
  {path: 'cerca', component: CercaComponent},
  {path: 'profilo', component: ProfiloUserComponent, canActivate: [authGuard]},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'dashboard/:idLuogo/modifica',component: ModificaLuogoComponent,canActivate: [authGuard]},
  {path: 'dashboard/:idLuogo', component: ModificaLuogoViewComponent, canActivate: [authGuard]},
  {path: 'dashboard', component: DashboardComponent,canActivate: [authGuard]},
  {path: '',pathMatch: 'full',redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

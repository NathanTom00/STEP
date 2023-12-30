import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { OnboardingComponent } from './componenti/onboarding/onboarding.component';
import { OnboardingObiettiviComponent } from './componenti/onboarding-obiettivi/onboarding-obiettivi.component';
import { OnboardingSuggerimentiComponent } from './componenti/onboarding-suggerimenti/onboarding-suggerimenti.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onboarding/obiettivi',component: OnboardingObiettiviComponent},
  {path: 'onboarding/obiettivi/suggerimenti',component: OnboardingSuggerimentiComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: '',redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

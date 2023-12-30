import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { OnboardingComponent } from './componenti/onboarding/onboarding.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onboarding', component: OnboardingComponent},
  {path: '',redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

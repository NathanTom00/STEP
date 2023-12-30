import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenti/home/home.component';
import { OnBoardingComponent } from './componenti/on-boarding/on-boarding.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'onboarding', component: OnBoardingComponent},
  {path: '',redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

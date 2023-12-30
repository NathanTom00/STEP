import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent{

  constructor(private router:Router, private route: ActivatedRoute){}


  onClick(){
    this.router.navigate(['./obiettivi'],{relativeTo: this.route})
  }
}

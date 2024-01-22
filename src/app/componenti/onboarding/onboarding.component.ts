import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit{

  constructor(private router:Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    localStorage.setItem('visitato','TRUE')
  }

  onClick(){
    this.router.navigate(['./obiettivi'],{relativeTo: this.route})
  }
}

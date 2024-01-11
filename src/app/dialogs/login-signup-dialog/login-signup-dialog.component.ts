import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { TasksService } from 'src/app/servizi/tasks.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-login-signup-dialog',
  templateUrl: './login-signup-dialog.component.html',
  styleUrls: ['./login-signup-dialog.component.css']
})
export class LoginSignupDialogComponent {

  hideErr = true
  signupPage : boolean
  
  signup: FormGroup = new FormGroup({
    user_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    pass: new FormControl('', [Validators.required,Validators.minLength(8)]),
    confPass: new FormControl('', Validators.required)
    
  });


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    pass: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<LoginSignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private authService : AuthService,private userService : UserService,private tasksService:TasksService ){
      this.signupPage = data.singUpPage
    }

  


  onSingupSubmit(){
    
    if(this.signup.value.pass !== this.signup.value.confPass){
      this.hideErr = false;
      return
    }
    let email = this.signup.value.email;
    let pass = this.signup.value.pass;
    let nome = this.signup.value.user_name;
    let tasks = this.tasksService.getTasks()
    this.authService.signUp(email,pass).pipe(
      switchMap(({user: {uid}}) => this.userService.addUser({
        uid : uid,
        email :email,
        nome : nome,
        taskTotali : tasks,
        taskFatti : [],
        badges : [],
        livello : 1,
        obiettiviInteressati: [],
        count_luoghi_esplorati: 0,
        emozioni_cercati: [],
        count_obiettivi_esplorati: 0,
        count_emozioni_aggiunti: 0
      }))
    ).subscribe(data => {
      console.log(data)
      location.reload()
    })
    //da fare: mettere l'utente su firestore
  }

  onLogInSubmit(){
    let email = this.loginForm.value.email;
    let pass = this.loginForm.value.pass;
    this.authService.logIn(email,pass).subscribe(data => location.reload())
  }

  switchPage(){
    this.signupPage = !this.signupPage 
  }
}

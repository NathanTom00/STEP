import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,private authService : AuthService){
      this.signupPage = data.singUpPage
    }

  


  onSingupSubmit(){
    if(this.signup.value.pass !== this.signup.value.confPass){
      this.hideErr = false;
      return
    }
    let email = this.signup.value.email;
    let pass = this.signup.value.pass;
    this.authService.signUp(email,pass).subscribe(data => location.reload())
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

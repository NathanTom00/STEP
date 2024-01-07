import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

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
    pass: new FormControl('', Validators.required),
    confPass: new FormControl('', Validators.required)
    
  });


  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    pass: new FormControl('', Validators.required),
  });

  constructor(public dialogRef: MatDialogRef<LoginSignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private dialog: MatDialog,){
      this.signupPage = data.singUpPage
    }

  


  onSingupSubmit(){
    
  }

  onLogInSubmit(){
  }

  switchPage(){
    this.signupPage = !this.signupPage 
  }
}

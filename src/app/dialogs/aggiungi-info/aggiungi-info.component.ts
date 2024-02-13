import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';

@Component({
  selector: 'app-aggiungi-info',
  templateUrl: './aggiungi-info.component.html',
  styleUrls: ['./aggiungi-info.component.css']
})
export class AggiungiInfoComponent {
  @Output() submitClicked = new EventEmitter<any>();
  aggiungiInfoForm : FormGroup = new FormGroup({
    nome : new FormControl('',[Validators.required]),
    link : new FormControl('', [Validators.required])
  })

  constructor(public dialogRef: MatDialogRef<AggiungiInfoComponent>){

    }

  

  onSubmit(){
    this.submitClicked.emit(this.aggiungiInfoForm.value);
    
    this.dialogRef.close()
  }
}

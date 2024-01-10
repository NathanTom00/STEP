import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cerca',
  templateUrl: './cerca.component.html',
  styleUrls: ['./cerca.component.css']
})
export class CercaComponent {
  stringaDaCercare = "";
  emozioniSelezionati : any[] = []
  obiettiviSelezionati : any[] = []
  cercaForm: FormGroup = new FormGroup({
    cercaInput: new FormControl('')
    
  });
    
  constructor(){}


  cercaSubmit(){
    this.stringaDaCercare = this.cercaForm.value.cercaInput
    
  }
}

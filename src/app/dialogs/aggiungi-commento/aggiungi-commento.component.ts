import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aggiungi-commento',
  templateUrl: './aggiungi-commento.component.html',
  styleUrls: ['./aggiungi-commento.component.css']
})
export class AggiungiCommentoComponent {
  aggiungiCommentoForm : FormGroup = new FormGroup({
    rating : new FormControl(),
    titolo : new FormControl(),
    descrizione : new FormControl(),
  })
  
  /**
   * TODO: prendere l'idLuogo dall'input
   */

  onSubmit(){
    console.log(this.aggiungiCommentoForm.value)
  }
}

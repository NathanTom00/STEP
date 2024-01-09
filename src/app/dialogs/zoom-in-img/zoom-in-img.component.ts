import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AggiungiEmozioniDialogComponent } from '../aggiungi-emozioni-dialog/aggiungi-emozioni-dialog.component';

@Component({
  selector: 'app-zoom-in-img',
  templateUrl: './zoom-in-img.component.html',
  styleUrls: ['./zoom-in-img.component.css']
})
export class ZoomInImgComponent {
  src : string = ""

  constructor(public dialogRef: MatDialogRef<AggiungiEmozioniDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){
    
    this.src = data.src
  }

  
}

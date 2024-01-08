import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmozioniServiceService {
  emozioni = [
    'nostalgia',
    'gioia',
    'sorpresa',
    'meraviglia',
    'malinconia',
    'pace',
    'allegria',
    'speranza',
  ];
  constructor() { }

  getEmozioni(){
    return this.emozioni
  }
}

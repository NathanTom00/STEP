import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks = [
    {nome: 'Traveller', descrizione: 'Esplora 3 luoghi'},
    {nome: "Because I'm happy", descrizione: 'Cerca gioia'},
    {nome: 'Soul search', descrizione: "Esplora un'anima locus"},
    {nome: 'Getting emotional', descrizione: "Aggiungi un'emozione a un luogo"},
    {nome: 'Traveller level 2', descrizione: 'Esplora 5 luoghi'},
  ]
  constructor() { }

  getTasks(){
    return this.tasks
  }
}

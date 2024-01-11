import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  urlIcon = '../../assets/badges/'
  badge = [
    {nome: 'Traveller',link: '../../assets/badges/'+'Traveller_icon.svg'},
    {nome: "Because I'm happy",link: '../../assets/badges/'+'Because_I_m_happy_icon.svg'},
    {nome: 'Soul search',link: '../../assets/badges/'+'Soul_search_icon.svg'},
    {nome: 'Getting emotional',link: '../../assets/badges/'+'Getting_emotional_icon.svg'},
    {nome: 'Traveller level 2',link: '../../assets/badges/'+'Traveller_icon.svg'},
  ]
  constructor() { }
}

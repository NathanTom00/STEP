import { Timestamp } from "firebase/firestore";

export interface ProfileUser{
    uid: string;
    email?: string;
    nome: string;
    taskTotali: {nome:string,descrizione:string}[];
    taskFatti: {nome:string,descrizione:string,data: number}[];
    livello: number;
    badges: string[];
    obiettiviInteressati: string[];
    count_luoghi_esplorati: number;
    emozioni_cercati: string[];
    count_obiettivi_esplorati: number;
    count_emozioni_aggiunti: number;

    
}
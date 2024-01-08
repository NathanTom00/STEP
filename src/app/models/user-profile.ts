export interface ProfileUser{
    uid: string;
    email?: string;
    nome: string;
    tasksDaFare: {nome:string,descrizione:string}[];
    taskTotali: {nome:string,descrizione:string}[]
    taskFatti: {nome:string,descrizione:string}[]
    badges: string[]
}
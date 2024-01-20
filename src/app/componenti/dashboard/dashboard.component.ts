import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, filter, map, toArray } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';
import { DatePipe } from '@angular/common';
import { Chart , registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  anni = [
    2024,
    2023,
    2022,
    2021,
    2020
  ]

  currentUser$: Observable<ProfileUser | null>;
  luoghiAdmin: any[] = [];
  idLuogoSelezionato: string = '';
  luogoSelezionato: any;
  commentiPositivi: any[] = [];
  commentiNegativi: any[] = [];
  annoSelezionato : number = 2023
  grafico!: Chart ;

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService,
    private datePipe: DatePipe
  ) {
    this.currentUser$ = userService.currentUserProfile$;
    Chart.register(...registerables)
  }

  ngOnInit(): void {
    this.currentUser$
      .pipe(
        map((data: any) => data.idLuoghiAdmin),
        concatMap((idLuoghi: any) =>
          this.firestoreService.getLuoghi().pipe(
            map((luoghi: any) => {
              return luoghi.filter((luogo: any) => idLuoghi.includes(luogo.id));
            })
          )
        )
      )
      .subscribe((data: any) => {
        this.luoghiAdmin = data;
        this.idLuogoSelezionato = data[0].id;
        this.selezionaLuogo(this.idLuogoSelezionato);
      });
  }

  selezionaLuogo(idLuogo: string) {
    this.idLuogoSelezionato = idLuogo;
    if(this.grafico)
      this.grafico.destroy()
    //ripulisco i commenti negativi e positivi
    this.commentiPositivi = [];
    this.commentiNegativi = [];
    for (let luogo of this.luoghiAdmin) {
      if (this.idLuogoSelezionato === luogo.id) this.luogoSelezionato = luogo;
    }

    //i commenti hanno ancora il timestamp => convertiamo in mese e anno
    for (let i = 0; i < this.luogoSelezionato['commenti'].length; i++) {
      this.luogoSelezionato.commenti[i]['mese'] = parseInt(
        this.datePipe.transform(this.luogoSelezionato.commenti[i].data, 'MM')!
      );
      this.luogoSelezionato.commenti[i]['anno'] = parseInt(
        this.datePipe.transform(this.luogoSelezionato.commenti[i].data, 'YYYY')!
      );
      if (this.luogoSelezionato.commenti[i]['recensione'] > 3) {
        this.commentiPositivi.push(this.luogoSelezionato.commenti[i]);
      } else {
        this.commentiNegativi.push(this.luogoSelezionato.commenti[i]);
      }
    }

    //per il grafico dobbiamo avere il numero di commenti positivi/negativi divisi in periodi di mesi
    //creo countCommentiPositiviByMonths che rappresenta l'array del conteggio raggruppato in mesi, dove la posizione i rappresenta l' (i+1)esimo mese dell'anno
    //e quindi l' i-esimo mese sarà rappresentato dall'elemento in i-1
    let countCommentiPositiviByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let countCommentiNegativiByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let commentoPositivo of this.commentiPositivi) {
      if (commentoPositivo.anno == this.annoSelezionato)
        countCommentiPositiviByMonths[commentoPositivo.mese - 1] += 1;
    }

    for (let commentoNegativo of this.commentiNegativi) {
      if (commentoNegativo.anno == this.annoSelezionato)
        countCommentiNegativiByMonths[commentoNegativo.mese - 1] += 1;
    }

    //console.log(countCommentiPositiviByMonths, countCommentiNegativiByMonths);
    this.grafico = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu','Lug','Ago','Set','Ott','Nov','Dic'],
        datasets: [
          {
            label: 'positivi',
            data: countCommentiPositiviByMonths,
            borderWidth: 2,
            borderColor: '#00b998',
            fill: false,
          },
          {
            label: 'negativi',
            data: countCommentiNegativiByMonths,
            borderWidth: 2,
            borderColor: '#d51a52',
            fill: false,
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              stepSize: 1
            },
            min: 0
          }
        },
        plugins: {
          legend: {
              position: 'bottom'
          }
      }
      }
    });
  }

  contaPositivi() {
    return this.commentiPositivi.length;
  }

  contaNegativi() {
    return this.commentiNegativi.length;
  }

  onChange(event : any){
    console.log(event.value)
  }
}

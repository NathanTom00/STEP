import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, filter, map, toArray } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { FirestoreService } from 'src/app/servizi/firestore.service';
import { UserService } from 'src/app/servizi/user.service';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  anni = [2024, 2023, 2022, 2021, 2020];

  currentUser$: Observable<ProfileUser | null>;
  luoghiAdmin: any[] = [];
  idLuogoSelezionato: string = '';
  luogoSelezionato: any;
  commentiPositivi: any[] = []; //commenti positivi di una fonte
  commentiNegativi: any[] = []; //commenti negativi di una fonte
  commentiTuttiPositivi : any = [] //commenti positivi sia di trip che di step
  commentiTuttiNegativi : any = [] //commenti negativi sia di trip che di step
  commentiRecenti: any[] = [];
  commentiTutti: any[] =[]
  annoSelezionato: number = 2023;
  fonte: string = 'tripadvisor';
  srcTipoDaCambiare = 'assets/Icons/tripadvisor-icon.svg';
  labelFiltroCommenti : string = 'Recenti'
  commentiFiltro : any[] = []
  grafico!: Chart;

  constructor(
    private userService: UserService,
    private firestoreService: FirestoreService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentUser$ = userService.currentUserProfile$;
    Chart.register(...registerables);
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
    

    //ripulisco i commenti negativi, positivi e commenti recenti
    this.commentiPositivi = [];
    this.commentiNegativi = [];
    this.commentiRecenti = [];
    this.commentiTutti = []
    this.commentiTuttiPositivi = [] 
    this.commentiTuttiNegativi  = []
    for (let luogo of this.luoghiAdmin) {
      if (this.idLuogoSelezionato === luogo.id) this.luogoSelezionato = luogo;
    }

    let commentiConNomeLuogo: any;
    //i commenti hanno ancora il timestamp => convertiamo in mese e anno
    for (let i = 0; i < this.luogoSelezionato['commenti'].length; i++) {
      this.luogoSelezionato.commenti[i]['mese'] = parseInt(
        this.datePipe.transform(this.luogoSelezionato.commenti[i].data, 'MM')!
      );
      this.luogoSelezionato.commenti[i]['anno'] = parseInt(
        this.datePipe.transform(this.luogoSelezionato.commenti[i].data, 'YYYY')!
      );

      commentiConNomeLuogo = this.luogoSelezionato.commenti[i];
      commentiConNomeLuogo['luogo'] = this.luogoSelezionato['nome'];
      this.commentiRecenti.push(commentiConNomeLuogo);

      if (this.luogoSelezionato.commenti[i]['recensione'] > 3) {
        this.commentiTuttiPositivi.push(this.luogoSelezionato.commenti[i]);
      } else {
        this.commentiTuttiNegativi.push(this.luogoSelezionato.commenti[i]);
      }

      //se la fonte è diversa lo ignoro per il grafico
      if (this.luogoSelezionato['commenti'][i]['fonte'] !== this.fonte)
        continue;

      if (this.luogoSelezionato.commenti[i]['recensione'] > 3) {
        this.commentiPositivi.push(this.luogoSelezionato.commenti[i]);
      } else {
        this.commentiNegativi.push(this.luogoSelezionato.commenti[i]);
      }
    }

    //ordino i commenti by data
    this.commentiRecenti.sort(this.sorter);
    this.commentiPositivi.sort(this.sorter);
    this.commentiNegativi.sort(this.sorter);
    this.commentiTuttiPositivi.sort(this.sorter);
    this.commentiTuttiNegativi.sort(this.sorter);
    this.commentiTutti = this.commentiRecenti

    //se i commenti sono più di 5 allora devo eliminare
    if (this.commentiRecenti.length > 5)
      this.commentiRecenti = this.commentiRecenti.slice(0, 5);

      this.filtraCommenti('recenti')
    this.creaGrafico();
  }

  sorter(commentoA: any, commentoB: any) {
    //riordino i commenti prima per anno e poi per mese
    //se a ha l'anno più grande allora ritorno -1 (più recente commentoA)
    if (commentoA['anno'] > commentoB['anno']) return -1;
    //se b ha l'anno più gerande allora ritorno 1 (più recente commentoB)
    if (commentoA['anno'] < commentoB['anno']) return 1;

    //se stiamo in questo caso allora hanno anni uguali, dobbiamo confrontare i mesi
    if (commentoA['mese'] > commentoB['mese']) return -1;
    if (commentoA['mese'] > commentoB['mese']) return 1;

    //se stiamo in questo caso vuol dire che hanno anno e mese uguali
    return 0;
  }

  creaGrafico() {
    //per il grafico dobbiamo avere il numero di commenti positivi/negativi divisi in periodi di mesi
    //creo countCommentiPositiviByMonths che rappresenta l'array del conteggio raggruppato in mesi, dove la posizione i rappresenta l' (i+1)esimo mese dell'anno
    //e quindi l' i-esimo mese sarà rappresentato dall'elemento in i-1
    if (this.grafico) this.grafico.destroy();

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

    try {
      this.grafico = new Chart('canvas', {
        type: 'line',
        data: {
          labels: [
            'Gen',
            'Feb',
            'Mar',
            'Apr',
            'Mag',
            'Giu',
            'Lug',
            'Ago',
            'Set',
            'Ott',
            'Nov',
            'Dic',
          ],
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
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              ticks: {
                stepSize: 1,
              },
              min: 0,
            },
          },
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    } catch (error) {}
  }

  contaPositivi() {
    return this.commentiPositivi.length;
  }

  contaNegativi() {
    return this.commentiNegativi.length;
  }

  onChange(event: any) {
    this.annoSelezionato = event.value;
    this.creaGrafico();
  }

  gestisciLuogo(idLuogo: string) {
    this.router.navigate([idLuogo], { relativeTo: this.activatedRoute });
  }

  cambiaTipoCommento(fonteDaCambiare: string, src: string) {
    this.srcTipoDaCambiare = src;
    this.fonte = fonteDaCambiare;
    this.selezionaLuogo(this.idLuogoSelezionato);
  }

  filtraCommenti(tipo : string){
    this.labelFiltroCommenti = tipo[0].toUpperCase() + tipo.substring(1)
    if(tipo === "recenti"){
      this.commentiFiltro = this.commentiRecenti
    }
    if(tipo === "tutti"){
      this.commentiFiltro = this.commentiTutti
    }
    if(tipo === "negativi"){
      this.commentiFiltro = this.commentiTuttiNegativi
    }
    if(tipo === "positivi"){
      this.commentiFiltro = this.commentiTuttiPositivi
    }
  }
}

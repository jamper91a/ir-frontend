import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TagsByDealerByMonthResponse} from '../../../webServices/response/TagsByDealerByMonthResponse';
import {GetAllCompaniesByDealerResponse} from '../../../webServices/response/GetAllCompaniesByDealerResponse';
import {Company} from '../../../pojo/Company';
import {Events} from '@ionic/angular';
import {InventarioReal} from '../../../providers/inventarioReal';
import {TranslateService} from '@ngx-translate/core';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  public response: TagsByDealerByMonthResponse;

  @ViewChild('canvas1', {static: false}) canvas1: ElementRef;
  @ViewChild('canvas2', {static: false}) canvas2: ElementRef;
  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;

  public chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  public chart1: Chart;
  public chart2: Chart;
  public dealer: GetAllCompaniesByDealerResponse;
  public companies: Company[];
  public allCompanies: Company[];
  public company;
  public monthNames = [];
  public translations;

  constructor(
      public events: Events,
      public inventarioReal: InventarioReal,
      public translateService: TranslateService
  ) {
  }

  async ngOnInit() {
  }

  async ionViewDidEnter() {
    this.events.publish('tittle', 'reports');
    this.inventarioReal.showDialog = false;
    // const response: TagsByDealerByMonthResponse = await this.inventarioReal.tagsByDealerByMonth();
    // await this.getCompanies();
    this.inventarioReal.showDialog = true;
    setTimeout(() => {
      this.translateService.get([
        'sold',
        'returned',
        'lost',
        'general_stats',
        'most_sold_items',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]).subscribe(async (values) => {
        this.translations = values;
        this.monthNames.push(values.January);
        this.monthNames.push(values.February);
        this.monthNames.push(values.March);
        this.monthNames.push(values.April);
        this.monthNames.push(values.May);
        this.monthNames.push(values.June);
        this.monthNames.push(values.July);
        this.monthNames.push(values.August);
        this.monthNames.push(values.September);
        this.monthNames.push(values.October);
        this.monthNames.push(values.November);
        this.monthNames.push(values.December);
        this.getSellStats();
        this.getMostSolProducts();

        // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        //   type: 'doughnut',
        //   data: {
        //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        //     datasets: [
        //       {
        //         label: '# of Votes',
        //         data: [12, 19, 3, 5, 2, 3],
        //         backgroundColor: [
        //           'rgba(255, 99, 132, 0.2)',
        //           'rgba(54, 162, 235, 0.2)',
        //           'rgba(255, 206, 86, 0.2)',
        //           'rgba(75, 192, 192, 0.2)',
        //           'rgba(153, 102, 255, 0.2)',
        //           'rgba(255, 159, 64, 0.2)'
        //         ],
        //         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56']
        //       }
        //     ]
        //   }
        // });
        // this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        //   type: 'line',
        //   data: {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //       {
        //         label: 'My First dataset',
        //         fill: false,
        //         lineTension: 0.1,
        //         backgroundColor: 'rgba(75,192,192,0.4)',
        //         borderColor: 'rgba(75,192,192,1)',
        //         borderCapStyle: 'butt',
        //         borderDash: [],
        //         borderDashOffset: 0.0,
        //         borderJoinStyle: 'miter',
        //         pointBorderColor: 'rgba(75,192,192,1)',
        //         pointBackgroundColor: '#fff',
        //         pointBorderWidth: 1,
        //         pointHoverRadius: 5,
        //         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        //         pointHoverBorderColor: 'rgba(220,220,220,1)',
        //         pointHoverBorderWidth: 2,
        //         pointRadius: 1,
        //         pointHitRadius: 10,
        //         data: [65, 59, 80, 81, 56, 55, 40],
        //         spanGaps: false
        //       }
        //     ]
        //   }
        // });
      });
    }, 10);
  }

  // async getCompanies() {
  //   try {
  //     this.dealer = null;
  //     this.dealer = await this.inventarioReal.getAllCompaniesByDealer();
  //     this.companies = this.dealer.data.companies;
  //     this.allCompanies = this.dealer.data.companies;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
  // async getReportByCompany(company1: Company) {
  //   this.company = company1;
  //   // const response: TagsByDealerByMonthResponse = await this.inventarioReal.tagsByCompanyByMonth(company1.id + '');
  //   this.translateService.get([
  //     'tags_sold',
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December'
  //   ]).subscribe(async (values) => {
  //     const labels = [];
  //     const data = [];
  //     // for (const aux of response.data) {
  //     //   labels.push(aux.day + '-' + values[aux.month]);
  //     //   data.push(aux.amount);
  //     // }
  //     this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
  //       type: 'bar',
  //       data: {
  //         labels,
  //         datasets: [
  //           {
  //             label: values.tags_sold,
  //             data,
  //             backgroundColor: [
  //               'rgba(255, 99, 132, 0.2)',
  //               'rgba(54, 162, 235, 0.2)',
  //               'rgba(255, 206, 86, 0.2)',
  //               'rgba(75, 192, 192, 0.2)',
  //               'rgba(153, 102, 255, 0.2)',
  //               'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //               'rgba(255,99,132,1)',
  //               'rgba(54, 162, 235, 1)',
  //               'rgba(255, 206, 86, 1)',
  //               'rgba(75, 192, 192, 1)',
  //               'rgba(153, 102, 255, 1)',
  //               'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //           }
  //         ]
  //       },
  //       options: {
  //         title: {
  //           display: true,
  //           text: 'Chart.js Bar Chart - Stacked'
  //         },
  //         tooltips: {
  //           mode: 'index',
  //           intersect: false
  //         },
  //         responsive: true,
  //         scales: {
  //           xAxes: [{
  //             stacked: true,
  //           }],
  //           yAxes: [{
  //             stacked: true
  //           }]
  //         }
  //       }
  //     });
  //   });
  // }
  // filterItems(ev: CustomEvent) {
  //   const val = ev.detail.value;
  //
  //   if (val && val.trim() !== '') {
  //     this.companies = this.allCompanies.filter((company: Company ) => {
  //       return (
  //           company.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 ||
  //           company.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
  //     });
  //   } else {
  //     this.companies = this.allCompanies;
  //   }
  // }

  public getSellStats() {

    // Get Data
    const sellStats = [
      [3, 4, 7],
      [-2, -3, -4],
      [-2, -2, 0]
    ];


    this.chart1 = new Chart(this.canvas1.nativeElement, {
      type: 'bar',
      data: {
        labels: this.monthNames,
        datasets: [
          {
            label: this.translations.sold,
            backgroundColor: this.chartColors.green,
            data: sellStats[0]
          },
          {
            label: this.translations.returned,
            backgroundColor: this.chartColors.red,
            data: sellStats[1]
          },
          {
            label: this.translations.lost,
            backgroundColor: this.chartColors.orange,
            data: sellStats[3]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: this.translations.general_stats
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        responsive: true,
        scales: {
          xAxes: [{
            stacked: true,
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    });
  }

  public getMostSolProducts() {

    // Get Data
    const mostSoldProductsData = {
      products: [
        'Green Jean',
        'Blue Jacket',
        'Black Shoes'
      ],
      data: [
        [3, 4, 7],
        [8, 5, 3],
        [5, 7, 2]
      ]
    };


    this.chart2 = new Chart(this.canvas2.nativeElement, {
      type: 'line',
      data: {
        labels: this.monthNames,
        datasets: [
          {
            label: mostSoldProductsData.products[0],
            fill: false,
            backgroundColor: this.chartColors.green,
            borderColor: this.chartColors.green,
            data: mostSoldProductsData.data[0]
          },
          {
            label: mostSoldProductsData.products[1],
            fill: false,
            backgroundColor: this.chartColors.red,
            borderColor: this.chartColors.red,
            data: mostSoldProductsData.data[1]
          },
          {
            label: mostSoldProductsData.products[2],
            fill: false,
            backgroundColor: this.chartColors.orange,
            borderColor: this.chartColors.orange,
            data: mostSoldProductsData.data[2]
          }
        ]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: this.translations.most_sold_items
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }
    });
  }

}

import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {Events} from '@ionic/angular';
import {InventarioReal} from '../../../providers/inventarioReal';
import {TagsByDealerByMonthResponse} from '../../../webServices/response/TagsByDealerByMonthResponse';
import {TranslateService} from '@ngx-translate/core';
import {GetAllCompaniesByDealerResponse} from '../../../webServices/response/GetAllCompaniesByDealerResponse';
import {Company} from '../../../pojo/Company';
import {Dealer} from '../../../pojo/Dealer';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

  public response: TagsByDealerByMonthResponse;

  @ViewChild('barCanvas', {static: false}) barCanvas: ElementRef;
  @ViewChild('barCanvas2', {static: false}) barCanvas2: ElementRef;
  @ViewChild('doughnutCanvas', {static: false}) doughnutCanvas: ElementRef;
  @ViewChild('lineCanvas', {static: false}) lineCanvas: ElementRef;

  public barChart: Chart;
  public barChart2: Chart;
  public doughnutChart: Chart;
  public lineChart: Chart;
  public dealer: GetAllCompaniesByDealerResponse;
  public companies: Company[];
  public allCompanies: Company[];
  public company;

  constructor(
      public events: Events,
      private inventarioReal: InventarioReal,
      public translateService: TranslateService
  ) {
  }

  async ngOnInit() {
  }
  async ionViewDidEnter() {
    this.events.publish('tittle', 'reports');
    this.inventarioReal.showDialog = false;
    const response: TagsByDealerByMonthResponse = await this.inventarioReal.tagsByDealerByMonth();
    await this.getCompanies();
    this.inventarioReal.showDialog = true;
    setTimeout(() => {
      this.translateService.get([
        'tags_sold',
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
        const labels = [];
        const data = [];
        for (const aux of response.data) {
          labels.push(aux.day + '-' + values[aux.month]);
          data.push(aux.amount);
        }
        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: values.tags_sold,
                data,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }
            ]
          }
        });
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
  async getCompanies() {
    try {
      this.dealer = null;
      this.dealer = await this.inventarioReal.getAllCompaniesByDealer();
      this.companies = this.dealer.data.companies;
      this.allCompanies = this.dealer.data.companies;
    } catch (e) {
      console.error(e);
    }
  }
  async getReportByCompany(company1: Company) {
    this.company = company1;
    const response: TagsByDealerByMonthResponse = await this.inventarioReal.tagsByCompanyByMonth(company1.id + '');
    this.translateService.get([
      'tags_sold',
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
      const labels = [];
      const data = [];
      for (const aux of response.data) {
        labels.push(aux.day + '-' + values[aux.month]);
        data.push(aux.amount);
      }
      this.barChart2 = new Chart(this.barCanvas2.nativeElement, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: values.tags_sold,
              data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        }
      });
    });
  }
  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.companies = this.allCompanies.filter((company: Company ) => {
        return (
            company.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 ||
            company.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.companies = this.allCompanies;
    }
  }

}

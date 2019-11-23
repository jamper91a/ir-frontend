import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {CreatePdfTotalnventoryRequest} from '../../../../../webServices/request/CreatePdfTotalnventoryRequest';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
@Component({
  selector: 'app-total',
  templateUrl: './total.page.html',
  styleUrls: ['./total.page.scss'],
})
export class TotalPage implements OnInit {
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal
  ) {
    this.translate.get('total_inventory').subscribe((value) => {
      this.pdfTitle = value;
    });
    this.allEmiterService.onNewTitle('total_inventory');
  }

  get countries(): Country[] {
    return this.COUNTRIES
        .map((country, i) => ({id: i + 1, ...country}))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  pdfTitle = '';

  tab: string;

  page = 1;
  pageSize = 4;
  public COUNTRIES: Country[] = [
    {
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      area: 640679,
      population: 64979548
    },
    {
      name: 'Germany',
      flag: 'b/ba/Flag_of_Germany.svg',
      area: 357114,
      population: 82114224
    },
    {
      name: 'Portugal',
      flag: '5/5c/Flag_of_Portugal.svg',
      area: 92090,
      population: 10329506
    },
    {
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      name: 'Vietnam',
      flag: '2/21/Flag_of_Vietnam.svg',
      area: 331212,
      population: 95540800
    },
    {
      name: 'Brazil',
      flag: '0/05/Flag_of_Brazil.svg',
      area: 8515767,
      population: 209288278
    },
    {
      name: 'Mexico',
      flag: 'f/fc/Flag_of_Mexico.svg',
      area: 1964375,
      population: 129163276
    },
    {
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      name: 'India',
      flag: '4/41/Flag_of_India.svg',
      area: 3287263,
      population: 1324171354
    },
    {
      name: 'Indonesia',
      flag: '9/9f/Flag_of_Indonesia.svg',
      area: 1910931,
      population: 263991379
    },
    {
      name: 'Tuvalu',
      flag: '3/38/Flag_of_Tuvalu.svg',
      area: 26,
      population: 11097
    },
    {
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];
  public collectionSize = this.COUNTRIES.length;
t;

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('total_inventory');
  }

  segmentChanged(ev: any) {
    this.tab = ev.detail.value;
  }
  generatePdf() {
    const request: CreatePdfTotalnventoryRequest = new CreatePdfTotalnventoryRequest();
    request.title = this.pdfTitle;
    for (let i = 0; i < 1000; i++) {
      request.rows.push({
        total: i,
        EPC: '123564321' + i,
        description: 'Camisa negra' + i
      });
    }
    this.inventarioReal.createPdf(request);
  }

}
interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;



}

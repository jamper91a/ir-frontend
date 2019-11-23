import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../services/all-emiter-service';
import {Product} from '../../../pojo/Product';
import {NavigationExtras} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {

    constructor(
      private allEmiterService: AllEmiterService,
      private navCtrl: NavController
  ) {
    this.allEmiterService.onNewTitle('reports');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('reports');
  }

  goToEanPlu() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          title: 'ean_plu_inventory',
          goTo: 'reports/inventory/eanplu'
        }
      }
    };
    this.navCtrl.navigateForward(['admin/reports/products/find'], navigationExtras);
  }

}

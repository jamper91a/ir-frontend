import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../services/all-emiter-service';
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
          goTo: 'admin/reports/inventory/eanplu'
        }
      }
    };
    this.navCtrl.navigateForward(['admin/reports/products/find'], navigationExtras);
  }

  goToDifference() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: {
          title: 'difference_inventories',
          goTo: 'admin/reports/inventory/difference'
        }
      }
    };
    this.navCtrl.navigateForward(['admin/reports/inventory/list'], navigationExtras);
  }

    goToSoldUnits() {
        const navigationExtras: NavigationExtras = {
            state: {
                data: {
                    title: 'sold_units',
                    goTo: 'admin/reports/inventory/sold'
                }
            }
        };
        this.navCtrl.navigateForward(['admin/reports/inventory/list'], navigationExtras);
    }

    goToRotationUnits() {
        const navigationExtras: NavigationExtras = {
            state: {
                data: {
                    title: 'rotation_inventory',
                    goTo: 'admin/reports/inventory/rotation'
                }
            }
        };
        this.navCtrl.navigateForward(['admin/reports/dates'], navigationExtras);
    }

    goToClientsReturn() {
        const navigationExtras: NavigationExtras = {
            state: {
                data: {
                    title: 'clients_return',
                    goTo: 'admin/reports/inventory/clientsReturn'
                }
            }
        };
        this.navCtrl.navigateForward(['admin/reports/dates'], navigationExtras);
    }

    goToSuppliersReturn() {
        const navigationExtras: NavigationExtras = {
            state: {
                data: {
                    title: 'suppliers_return',
                    goTo: 'admin/reports/inventory/suppliersReturn'
                }
            }
        };
        this.navCtrl.navigateForward(['admin/reports/dates'], navigationExtras);
    }

}

import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../services/all-emiter-service';
import {Supplier} from '../../../pojo/Supplier';
import {GetSuppliersByCompanyResponse} from '../../../webServices/response/GetSuppliersByCompanyResponse';
import {InventarioReal} from '../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
})
export class SuppliersPage implements OnInit {

  public suppliers: Supplier[];
  public allSuppliers: Supplier[];
  constructor(
      private allEmiterService: AllEmiterService,
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private navCtrl: NavController
  ) {
    this.allEmiterService.onNewTitle('suppliers');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('suppliers');
    const dialog = await this.util.showDialog('');
    try {
      this.inventarioReal.showDialog = false;
      await this.getSuppliers();
      this.inventarioReal.showDialog = true;
      await dialog.dismiss();
    } catch (e) {
      await dialog.dismiss();
    }
  }

  async getSuppliers() {
    try {
      const response: GetSuppliersByCompanyResponse = await this.inventarioReal.getSuppliers();
      this.suppliers = response.data;
      this.allSuppliers = response.data;
    } catch (e) {
      this.util.showToast(e);
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.suppliers = this.allSuppliers.filter((supplier: Supplier) => {
        return (
            supplier.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.allSuppliers = this.suppliers;
    }
  }
  goToSupplier(supplier: Supplier) {
    const navigationExtras: NavigationExtras = {
      state: {
        supplier
      }
    };
    this.navCtrl.navigateForward(['admin/suppliers/edit/' + supplier.id], navigationExtras);
  }

}

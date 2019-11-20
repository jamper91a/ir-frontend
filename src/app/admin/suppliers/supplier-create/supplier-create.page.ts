import { Component, OnInit } from '@angular/core';
import {CreateSupplierRequest} from '../../../../webServices/request/CreateSupplierRequest';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {AllEmiterService} from '../../../services/all-emiter-service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.page.html',
  styleUrls: ['./supplier-create.page.scss'],
})
export class SupplierCreatePage implements OnInit {
  public request: CreateSupplierRequest = new CreateSupplierRequest();
  constructor(
      private inventarioReal: InventarioReal,
      private platform: Platform,
      private util: Util,
      private allEmiterService: AllEmiterService,
      private navCtrl: NavController,
  ) {
    this.allEmiterService.onNewTitle('new_supplier');
  }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('new_supplier');
  }

  async doCreate() {
    try {
      this.request.validate();
      await this.inventarioReal.createSupplier(this.request);
      this.util.showToast('supplier_created');
      this.navCtrl.navigateBack(['admin/suppliers' ]);
    } catch (e) {
      this.util.showToast(e);
    }
  }

}

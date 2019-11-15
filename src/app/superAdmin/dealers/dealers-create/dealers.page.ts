import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Platform} from '@ionic/angular';
import {CreateDealerRequest} from '../../../../webServices/request/CreateDealerRequest';
import {Util} from '../../../../providers/util';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.page.html',
  styleUrls: ['./dealers.page.scss'],
})
export class DealersPage implements OnInit {

  public request: CreateDealerRequest;
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util
  ) {
    this.request = new CreateDealerRequest();
  }

  async ngOnInit() {

  }
  async create() {
    try {
      this.request.validate();
      await this.inventarioReal.createDealer(this.request);
      this.util.showToast('dealer_created');
      this.request.clean();
    } catch (e) {
      this.util.showToast(e.toString());
    }
  }


}

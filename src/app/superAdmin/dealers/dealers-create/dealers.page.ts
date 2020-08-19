import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, Platform} from '@ionic/angular';
import {CreateDealerRequest} from '../../../../webServices/request/CreateDealerRequest';
import {Util} from '../../../../providers/util';
import {environment} from "../../../../environments/environment";

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
      public util: Util,
      public events: Events,
  ) {
    this.request = new CreateDealerRequest();
    this.events.publish('tittle', 'new_dealer');
  }

  async ngOnInit() {
    if (environment.test) {
      this.request.user.username = this.util.generateEmail();
      this.request.user.password = this.util.generatePassword();
      this.request.user.rpassword = this.util.generatePassword();
      this.request.user.name = this.util.generateName();
      this.request.dealer.name = this.util.generateName();
    }


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

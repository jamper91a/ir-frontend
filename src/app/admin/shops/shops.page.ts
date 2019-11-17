import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../providers/inventarioReal';
import {Events, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {Company} from '../../../pojo/Company';
import {CreateShopRequest} from '../../../webServices/request/CreateShopRequest';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {

  public company: Company;
  public request: CreateShopRequest;
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              public events: Events) {
    this.events.publish('tittle', 'new_dealer');
    this.request = new CreateShopRequest();
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.getCompany();
  }
  async getCompany() {
    this.platform.ready().then(async () => {
      const response = await this.inventarioReal.getCompanyById();
      this.company = response.data;
      // this.request.putData(this.company);
      this.events.publish('tittle', this.company.name);
    });
  }
  async doCreate() {
    try {
      this.request.validate();
      await this.inventarioReal.createShop(this.request);
      this.util.showToast('shop_created');
    } catch (e) {
      this.util.showToast(e);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import {Company} from '../../../pojo/Company';
import {CreateShopRequest} from '../../../webServices/request/CreateShopRequest';
import {Shop} from '../../../pojo/Shop';
import {InventarioReal} from '../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {GetShopsByCompanyResponse} from '../../../webServices/response/GetShopsByCompanyResponse';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-zones',
  templateUrl: './zones.page.html',
  styleUrls: ['./zones.page.scss'],
})
export class ZonesPage implements OnInit {

  public company: Company;
  public request: CreateShopRequest;
  public shops: Shop[];
  public allShops: Shop[];
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              public events: Events) {
    this.request = new CreateShopRequest();
  }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    const dialog = await this.util.showDialog('');
    this.inventarioReal.showDialog = false;
    await this.getCompany();
    await this.getShops();
    this.inventarioReal.showDialog = true;
    await dialog.dismiss();
  }
  async getCompany() {
    this.platform.ready().then(async () => {
      const response = await this.inventarioReal.getCompanyById();
      this.company = response.data;
      // this.request.putData(this.company);
      this.events.publish('tittle', this.company.name);
    });
  }

  async getShops() {
    try {
      const response: GetShopsByCompanyResponse = await this.inventarioReal.getShopsByCompany();
      this.shops = response.data;
      this.allShops = response.data;
    } catch (e) {
      this.util.showToast(e);
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.shops = this.allShops.filter((shop: Shop ) => {
        return (
            shop.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.allShops = this.shops;
    }
  }
  goToShop(shop: Shop) {
    const navigationExtras: NavigationExtras = {
      state: {
        shop
      }
    };
    this.navCtrl.navigateForward(['admin/zones/create/' + shop.id], navigationExtras);
  }

}

import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {Company} from '../../../pojo/Company';
import {CreateShopRequest} from '../../../webServices/request/CreateShopRequest';
import {Shop} from '../../../pojo/Shop';
import {GetShopsByCompanyResponse} from '../../../webServices/response/GetShopsByCompanyResponse';
import {NavigationExtras} from '@angular/router';
import {AllEmiterService} from '../../services/all-emiter-service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.page.html',
  styleUrls: ['./shops.page.scss'],
})
export class ShopsPage implements OnInit {

  public company: Company;
  public request: CreateShopRequest;
  public shops: Shop[];
  public allShops: Shop[];
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              private allEmiterService: AllEmiterService) {
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
      this.allEmiterService.onNewTitle(this.company.name);
    });
  }
  async doCreate() {
    try {
      this.request.validate();
      await this.inventarioReal.createShop(this.request);
      this.util.showToast('shop_created');
      this.getShops();
    } catch (e) {
      this.util.showToast(e);
    }
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
    this.navCtrl.navigateForward(['admin/shops/edit/' + shop.id], navigationExtras);
  }

}

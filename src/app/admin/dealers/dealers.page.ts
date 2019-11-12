import { Component, OnInit } from '@angular/core';
import {AllDealersResponse} from '../../../webServices/response/AllDealersResponse';
import {InventarioReal} from '../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {CreateDealerRequest} from '../../../webServices/request/CreateDealerRequest';
import {Util} from '../../../providers/util';
import {Dealer} from '../../../pojo/Dealer';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-dealers',
  templateUrl: './dealers.page.html',
  styleUrls: ['./dealers.page.scss'],
})
export class DealersPage implements OnInit {

  private dealers: AllDealersResponse;
  private allDealers: Dealer[];
  private request: CreateDealerRequest;
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private router: Router,
      private navCtrl: NavController
  ) {
    this.request = new CreateDealerRequest();
  }

  async ngOnInit() {

  }

  async ionViewDidEnter() {
    this.platform.ready().then(async () => {
      await this.getDealers();
    });
  }

  async getDealers() {
    try {
      this.dealers = null;
      this.dealers = await this.inventarioReal.allDealers();
      this.allDealers = this.dealers.data;
    } catch (e) {
      console.error(e);
    }
  }

  async create() {
    try {
      this.request.validate();
      this.dealers = await this.inventarioReal.createDealer(this.request);
      this.util.showToast('dealer_created');
      this.request.clean();
      await this.getDealers();
    } catch (e) {
      this.util.showToast(e.toString());
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.dealers.data = this.allDealers.filter((dealer: Dealer ) => {
        return (
            dealer.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 ||
            dealer.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.dealers.data = this.allDealers;
    }
  }

  goToDealer(dealer: Dealer) {
    const navigationExtras: NavigationExtras = {
      state: {
        dealer
      }
    };
    this.navCtrl.navigateForward(['home/admin/dealers/details/' + dealer.id], navigationExtras);
  }

}

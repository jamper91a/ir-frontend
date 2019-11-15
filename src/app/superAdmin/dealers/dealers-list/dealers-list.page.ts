import { Component, OnInit } from '@angular/core';
import {AllDealersResponse} from '../../../../webServices/response/AllDealersResponse';
import {Dealer} from '../../../../pojo/Dealer';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-dealers-list',
  templateUrl: './dealers-list.page.html',
  styleUrls: ['./dealers-list.page.scss'],
})
export class DealersListPage implements OnInit {
  public dealers: AllDealersResponse;
  public allDealers: Dealer[];
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private router: Router,
      private navCtrl: NavController,
      public events: Events,
  ) {
    this.events.publish('tittle', 'current_dealers');
  }

  ngOnInit() {
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
    this.navCtrl.navigateForward(['superAdmin/a/dealers/details/' + dealer.id], navigationExtras);
  }

}

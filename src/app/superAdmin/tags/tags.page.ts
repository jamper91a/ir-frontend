import { Component, OnInit } from '@angular/core';
import {AllDealersResponse} from '../../../webServices/response/AllDealersResponse';
import {Dealer} from '../../../pojo/Dealer';
import {CreateDealerRequest} from '../../../webServices/request/CreateDealerRequest';
import {InventarioReal} from '../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
  public dealers: AllDealersResponse;
  public allDealers: Dealer[];
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.getDealers();
  }

  async getDealers() {
    try {
      this.dealers = null;
      this.dealers = await this.inventarioReal.allDealers(true);
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
    this.navCtrl.navigateForward(['home/admin/dealers/details/' + dealer.id], navigationExtras);
  }

}

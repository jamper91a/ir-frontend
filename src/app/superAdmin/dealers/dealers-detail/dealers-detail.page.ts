import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dealer} from '../../../../pojo/Dealer';
import {UpdateDealerRequest} from '../../../../webServices/request/UpdateDealerRequest';
import {Util} from '../../../../providers/util';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController} from '@ionic/angular';

@Component({
  selector: 'app-dealers-detail',
  templateUrl: './dealers-detail.page.html',
  styleUrls: ['./dealers-detail.page.scss'],
})
export class DealersDetailPage implements OnInit {
  data: Dealer;
  request: UpdateDealerRequest = new UpdateDealerRequest();
  dealerId: string;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private util: Util,
      private inventarioReal: InventarioReal,
      private navCtrl: NavController,
      public events: Events,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.dealer;
        this.request.putData(this.data);
        this.events.publish('tittle', this.data.name);
      }
      this.dealerId = this.route.snapshot.paramMap.get('id');
      if (!this.data) {
        this.getDealer(this.dealerId);
      }
    });
  }

  getDealer(id: string) {
  }

  ngOnInit() {
  }

  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateDealer(this.request);
      this.util.showToast('dealer_updated');
      this.navCtrl.navigateBack('home/admin/dealers');
    } catch (e) {
      this.util.showToast(e.toString());
    }

  }

  async doDelete(){

  }

}

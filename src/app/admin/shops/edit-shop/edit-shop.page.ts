import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {Shop} from '../../../../pojo/Shop';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateShopRequest} from '../../../../webServices/request/UpdateShopRequest';
import {AllEmiterService} from '../../../services/all-emiter-service';

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.page.html',
  styleUrls: ['./edit-shop.page.scss'],
})
export class EditShopPage implements OnInit {

  public shop: Shop;
  public shopId: string;
  public request: UpdateShopRequest = new UpdateShopRequest();
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private allEmiterService: AllEmiterService,
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.shop = this.router.getCurrentNavigation().extras.state.shop;
        this.request.putData(this.shop);
        this.allEmiterService.onNewTitle(this.shop.name);
      }
      this.shopId = this.route.snapshot.paramMap.get('id');
      this.request.id = this.shopId;
    });
  }

  ngOnInit() {
  }

  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateShop(this.request);
      this.navCtrl.navigateBack('admin/shops');
    } catch (e) {
      this.util.showToast(e);
    }
  }

}

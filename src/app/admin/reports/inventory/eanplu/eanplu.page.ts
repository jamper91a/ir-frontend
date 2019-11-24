import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Util} from '../../../../../providers/util';
import {Product} from '../../../../../pojo/Product';
import {GetProductInShopByEanPluRequest} from '../../../../../webServices/request/GetProductInShopByEanPluRequest';
import {GetProductInShopByEanPluResponse} from '../../../../../webServices/response/getProductInShopByEanPluResponse';

@Component({
  selector: 'app-eanplu',
  templateUrl: './eanplu.page.html',
  styleUrls: ['./eanplu.page.scss'],
})
export class EanpluPage implements OnInit {

  public product: Product;
  public request: GetProductInShopByEanPluRequest = new GetProductInShopByEanPluRequest();
  public result: GetProductInShopByEanPluResponse = new GetProductInShopByEanPluResponse();

  page = 1;
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
      private util: Util
  ) {
    this.allEmiterService.onNewTitle('ean_plu_inventory');
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.product = this.router.getCurrentNavigation().extras.state.product;
        this.request.product = this.product.id + '';
      }
    });
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    if (this.product) {
      try {
        this.result = await this.inventarioReal.getProductInShopByEanPlu(this.request);
      } catch (e) {
        // this.util.showToast(e);
      }
    }

  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('ean_plu_inventory');
    if (!this.product) {
      this.navCtrl.navigateBack('admin/reports');
    }
  }

}

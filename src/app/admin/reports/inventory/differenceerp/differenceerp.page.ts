import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {GetDiferenceInventoryErpResponse} from '../../../../../webServices/response/GetDiferenceInventoryErpResponse';

@Component({
  selector: 'app-differenceerp',
  templateUrl: './differenceerp.page.html',
  styleUrls: ['./differenceerp.page.scss'],
})
export class DifferenceerpPage implements OnInit {
  public response: GetDiferenceInventoryErpResponse;
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute
  ) {
    this.allEmiterService.onNewTitle('difference_physical_and_erp_inventories');
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.response = await this.inventarioReal.getDiferenceInventoryErp();
    } catch (e) {
      // this.util.showToast(e);
    }
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('difference_physical_and_erp_inventories');
  }

}

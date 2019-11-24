import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Util} from '../../../../../providers/util';
import {GetAllConsolidatedInventoriesResponse} from '../../../../../webServices/response/GetAllConsolidatedInventoriesResponse';
import {ConsolidatedInventory} from '../../../../../pojo/ConsolidatedInventory';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public result: GetAllConsolidatedInventoriesResponse = new GetAllConsolidatedInventoriesResponse();
  public data: {
    initialInventory: ConsolidatedInventory,
    finalInventory: ConsolidatedInventory,
  } = {
    initialInventory: null,
    finalInventory: null
  };

  public step = 1;

  constructor(private allEmiterService: AllEmiterService,
              private translate: TranslateService,
              private inventarioReal: InventarioReal,
              private route: ActivatedRoute,
              private router: Router,
              private navCtrl: NavController,
              private util: Util) {
    this.allEmiterService.onNewTitle('difference_inventories');
  }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    try {
      this.result = await this.inventarioReal.getAllConsolidatedInventories();
    } catch (e) {
      // this.util.showToast(e.me);
    }
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('difference_inventories');
  }

  selectInventory(inventory: ConsolidatedInventory) {
    if (this.step === 1) {
      this.data.initialInventory = inventory;
      this.step = 2;
    } else {
      this.data.finalInventory = inventory;
    }
  }

}

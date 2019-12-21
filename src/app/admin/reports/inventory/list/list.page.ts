import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {GetAllConsolidatedInventoriesResponse} from '../../../../../webServices/response/GetAllConsolidatedInventoriesResponse';
import {ConsolidatedInventory} from '../../../../../pojo/ConsolidatedInventory';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public result: GetAllConsolidatedInventoriesResponse;
  public request: {
    initialInventory: ConsolidatedInventory,
    finalInventory: ConsolidatedInventory,
  } = {
    initialInventory: null,
    finalInventory: null
  };
  public data: any;
  public step = 1;
  constructor(private allEmiterService: AllEmiterService,
              private translate: TranslateService,
              private inventarioReal: InventarioReal,
              private router: Router,
              private navCtrl: NavController,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
        if (!this.data) {
          this.navCtrl.navigateBack('admin/reports');
        }
        this.allEmiterService.onNewTitle(this.data.title);
      }
    });
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
    this.allEmiterService.onNewTitle(this.data.title);
  }

  selectInventory(inventory: ConsolidatedInventory) {
    if (this.step === 1) {
      this.request.initialInventory = inventory;
      this.step = 2;
    } else {
      this.request.finalInventory = inventory;
      // Go to next page and send the data
      this.goToNextPage();
    }
  }

  goToNextPage() {
    const navigationExtras: NavigationExtras = {
      state: {
        request: this.request
      }
    };
    this.navCtrl.navigateForward([this.data.goTo], navigationExtras);

  }

}

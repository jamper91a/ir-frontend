/* tslint:disable:align */
import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {GetDiferenceBetweenInventoriesResponse} from '../../../../../webServices/response/GetDiferenceBetweenInventoriesResponse';
import {GetDiferenceBetweenInventoriesRequest} from '../../../../../webServices/request/GetDiferenceBetweenInventoriesRequest';

@Component({
  selector: 'app-difference',
  templateUrl: './difference.page.html',
  styleUrls: ['./difference.page.scss'],
})
export class DifferencePage implements OnInit {

    public request: GetDiferenceBetweenInventoriesRequest;
    public response: GetDiferenceBetweenInventoriesResponse;
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute
  ) {
    this.allEmiterService.onNewTitle('difference_physical_inventories');
      this.route.queryParams.subscribe(() => {
          if (this.router.getCurrentNavigation().extras.state) {
              const aux = this.router.getCurrentNavigation().extras.state.request;
              if (aux) {
                  this.request = new GetDiferenceBetweenInventoriesRequest();
                  this.request.firstInventory = aux.initialInventory;
                  this.request.secondInventory = aux.finalInventory;
              } else {
                  this.navCtrl.navigateBack('admin/reports');
              }
          }
      });
  }

  ngOnInit() {
      this.getData();
  }

    async getData() {
        if (this.request) {
            try {
                this.response = await this.inventarioReal.getDiferenceBetweenInventories(this.request);
            } catch (e) {
                // this.util.showToast(e);
            }
        }

    }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('difference_physical_inventories');
      if (!this.request) {
          this.navCtrl.navigateBack('admin/reports');
      }
  }

}

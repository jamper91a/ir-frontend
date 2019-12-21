import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {Product} from '../../../../../pojo/Product';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {GetRotationProjectedRequest} from '../../../../../webServices/request/GetRotationProjectedRequest';
import {GetRotationProjectedResponse} from '../../../../../webServices/response/GetRotationProjectedResponse';
import {Util} from '../../../../../providers/util';

@Component({
  selector: 'app-rotationprojected',
  templateUrl: './rotationprojected.page.html',
  styleUrls: ['./rotationprojected.page.scss'],
})
export class RotationprojectedPage implements OnInit {

  public product: Product;
  public request: GetRotationProjectedRequest = new GetRotationProjectedRequest();
  public result: GetRotationProjectedResponse = new GetRotationProjectedResponse();
  public columnNames;
  public step = 1;

  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController,
      public util: Util
  ) {
    this.allEmiterService.onNewTitle('rotation_projected');
    this.translate.get(['rotation_projected', 'total_units_suggested']).subscribe((values) => {
      this.columnNames = values;
    });
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.product = this.router.getCurrentNavigation().extras.state.product;
        this.request.product = this.product;
      }
    });
  }

  async getReport() {
    if (this.product && this.request.days > 0) {
      try {
        this.result = await this.inventarioReal.getRotationProjected(this.request);
        this.step = 2;
      } catch (e) {
        this.navCtrl.navigateBack('admin/reports');
        // this.util.showToast(e);
      }
    }
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('rotation_projected');
    if (!this.product) {
      this.navCtrl.navigateBack('admin/reports');
    }
  }

}

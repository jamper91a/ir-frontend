import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {SaleUnitsReportRequest} from '../../../../../webServices/request/SaleUnitsReportRequest';
import {GetSoldUnitsResponse} from '../../../../../webServices/response/GetSoldUnitsResponse';
import {ProductHasZone} from '../../../../../pojo/ProductHasZone';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.page.html',
  styleUrls: ['./sold.page.scss'],
})
export class SoldPage implements OnInit {

    public request: SaleUnitsReportRequest;
    public response: GetSoldUnitsResponse;
    public products: ProductHasZone[];
    public allProducts: ProductHasZone[] = [];
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute
  ) {
      this.allEmiterService.onNewTitle('sold_units');
      this.route.queryParams.subscribe(() => {
          if (this.router.getCurrentNavigation().extras.state) {
              const aux = this.router.getCurrentNavigation().extras.state.request;
              if (aux) {
                  this.request = new SaleUnitsReportRequest();
                  this.request.firstDate = aux.initialInventory;
                  this.request.secondDate = aux.finalInventory;
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
                this.response = await this.inventarioReal.getSoldUnits(this.request);
                this.products = [];
                this.products.concat(this.response.data.saleUnits);
                this.products.concat(this.response.data.returnedUnits);
                if (this.products.length > 0) {
                    for (const phz of this.products) {
                        this.addProduct(phz);
                    }
                }
            } catch (e) {
                // this.util.showToast(e);
            }
        }
    }

    addProduct(product: ProductHasZone) {
        if (this.allProducts.length === 0) {
            this.allProducts.push(product);
        } else {
            for (const phz of this.allProducts) {
                if (phz.id === product.id) {
                    phz.total++;
                    return;
                }
            }
            this.allProducts.push(product);
        }
    }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('sold_units');
  }

}

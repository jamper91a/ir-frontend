/* tslint:disable:align */
import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {GetDiferenceBetweenInventoriesResponse} from '../../../../../webServices/response/GetDiferenceBetweenInventoriesResponse';
import {GetDiferenceBetweenInventoriesRequest} from '../../../../../webServices/request/GetDiferenceBetweenInventoriesRequest';
import {ProductHasZone} from '../../../../../pojo/ProductHasZone';
import {Util} from '../../../../../providers/util';
import {CreatePdfTotalnventoryRequest} from '../../../../../webServices/request/CreatePdfTotalnventoryRequest';
import {CreatePdfTotalnventoryEpcRequest} from '../../../../../webServices/request/CreatePdfTotalnventoryEpcRequest';

@Component({
  selector: 'app-difference',
  templateUrl: './difference.page.html',
  styleUrls: ['./difference.page.scss'],
})
export class DifferencePage implements OnInit {

    public request: GetDiferenceBetweenInventoriesRequest;
    public response: GetDiferenceBetweenInventoriesResponse;
    public products: ProductHasZone[];
    public allProducts: ProductHasZone[];
    public visual = false;
    public columnNames;
    public date: Date = new Date();
    tab: string;
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute,
      public util: Util
  ) {
    this.allEmiterService.onNewTitle('difference_physical_inventories');
      this.route.queryParams.subscribe(() => {
          if (this.router.getCurrentNavigation().extras.state) {
              const aux = this.router.getCurrentNavigation().extras.state.request;
              if (aux) {
                  this.request = new GetDiferenceBetweenInventoriesRequest();
                  this.request.firstInventory = aux.initialInventory.id;
                  this.request.secondInventory = aux.finalInventory.id;
              } else {
                  this.navCtrl.navigateBack('admin/reports');
              }
          }
      });

      this.translate.get(['difference_physical_inventories', 'total', 'ean_plu', 'description', 'epc']).subscribe((values) => {
          this.columnNames = values;
      });
  }

  ngOnInit() {
      this.getData();
  }

    async getData() {
        if (this.request) {
            try {
                this.response = await this.inventarioReal.getDiferenceBetweenInventories(this.request);
                if (this.response.data) {
                    this.products = [];
                    this.allProducts = [];
                    for (const phz of this.response.data) {
                            // this.products.push(phz);
                            phz.total = 1;
                            this.allProducts.push(phz);
                            let aux2 = false;
                            let auxPos = 0;
                            for (const aux of this.products) {
                                if (aux.product.id === phz.product.id) {
                                    if (aux.total) {
                                        aux.total = aux.total + 1;
                                    } else {
                                        aux.total = 0;
                                    }

                                    // this.products[auxPos] = aux;
                                    aux2 = true;
                                }
                                auxPos++;
                            }
                            if (!aux2) {
                                this.products.push(phz);
                            }
                    }
                    this.tab = 'total';
                }
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

    segmentChanged(ev: any) {
        this.tab = ev.detail.value;
    }

    generatePdDifference() {
        const request: CreatePdfTotalnventoryRequest = new CreatePdfTotalnventoryRequest();
        request.title = this.columnNames.difference_physical_inventories;
        request.shop = '';
        request.rows.push({
            total: this.columnNames.total,
            ean: this.columnNames.ean_plu,
            description: this.columnNames.description
        });
        for (const product of this.products) {
            request.rows.push({
                total: product.total,
                ean: product.product.ean,
                description: product.product.description
            });
        }
        this.inventarioReal.createPdf(request);
    }
    generatePdfDifferenceEpc() {
        const request: CreatePdfTotalnventoryEpcRequest = new CreatePdfTotalnventoryEpcRequest();
        request.title = this.columnNames.difference_physical_inventories;
        request.shop = '';
        request.rows.push({
            epc: this.columnNames.epc,
            description: this.columnNames.description
        });
        for (const product of this.allProducts) {
            request.rows.push({
                epc: product.epc.epc,
                description: product.product.description
            });
        }
        this.inventarioReal.createPdf(request);
    }

}

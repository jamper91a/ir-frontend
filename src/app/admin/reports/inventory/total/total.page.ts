import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {CreatePdfTotalnventoryRequest} from '../../../../../webServices/request/CreatePdfTotalnventoryRequest';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {GetLastConsolidatedInventory} from '../../../../../webServices/response/GetLastConsolidatedInventory';
import {ProductHasZone} from '../../../../../pojo/ProductHasZone';
import {Util} from '../../../../../providers/util';
@Component({
  selector: 'app-total',
  templateUrl: './total.page.html',
  styleUrls: ['./total.page.scss'],
})
export class TotalPage implements OnInit {
  public products: ProductHasZone[];
  public allProducts: ProductHasZone[];
  public result: GetLastConsolidatedInventory;
  public visual = false;
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private util: Util
  ) {
    this.translate.get('total_inventory').subscribe((value) => {
      this.pdfTitle = value;
    });
    this.allEmiterService.onNewTitle('total_inventory');
  }

  pdfTitle = '';

  tab: string;

  page = 1;
  pageSize = 4;

  ngOnInit() {
    this.getData();
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('total_inventory');
  }

  segmentChanged(ev: any) {
    this.tab = ev.detail.value;
  }


  async getData() {
    try {
      this.result = await this.inventarioReal.getLastConsolidatedInventory();
      if (this.result.data) {
        this.products = [];
        this.allProducts = [];
        for (const inventory of this.result.data.inventories) {
          for (const phz of inventory.products) {
            this.products.push(phz);
            if (this.allProducts.length === 0) {
              this.products.push(phz);
            } else {
              let aux2 = false;
              for (const aux of this.products) {
                if (aux.id === phz.id) {
                  aux.total++;
                  aux2 = true;
                  return;
                }
              }
              if (!aux2) {
                this.products.push(phz);
              }
            }
          }
        }
      }
    } catch (e) {
      this.util.showToast(e);
    }
  }

  generatePdf() {
    const request: CreatePdfTotalnventoryRequest = new CreatePdfTotalnventoryRequest();
    request.title = this.pdfTitle;
    for (let i = 0; i < 1000; i++) {
      request.rows.push({
        total: i,
        EPC: '123564321' + i,
        description: 'Camisa negra' + i
      });
    }
    this.inventarioReal.createPdf(request);
  }

}

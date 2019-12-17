import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {CreatePdfTotalnventoryRequest} from '../../../../../webServices/request/CreatePdfTotalnventoryRequest';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {GetLastConsolidatedInventory} from '../../../../../webServices/response/GetLastConsolidatedInventory';
import {ProductHasZone} from '../../../../../pojo/ProductHasZone';
import {Util} from '../../../../../providers/util';
import {Employee} from '../../../../../pojo/Employee';
import {NavController} from '@ionic/angular';
import {Shop} from '../../../../../pojo/Shop';
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
  public step = 1;
  public shop: Shop;
  public employees: Employee[] = [];
  public allEmployees: Employee[] = [];
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private navCtrl: NavController,
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
      const aux = await this.inventarioReal.getEmployeesByAdmin();
      if (aux) {
        this.employees = aux.data;
        this.allEmployees = aux.data;
      } else {
        this.employees = [];
        this.navCtrl.navigateBack('admin/reports');
      }
    } catch (e) {
      console.error(e);
    }
  }

  async getReport(employee: Employee) {
    this.step = 2;
    this.shop = employee.shop;
    try {
      this.result = await this.inventarioReal.getLastConsolidatedInventoryByAdmin(employee.id + '');
      if (this.result.data) {
        this.products = [];
        this.allProducts = [];
        for (const inventory of this.result.data.inventories) {
          for (const phz of inventory.products) {
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
        }
        this.tab = 'total';
      }
    } catch (e) {
      console.error(e);
      // this.util.showToast(e);
    }
  }

  generatePdfEan() {
    const request: CreatePdfTotalnventoryRequest = new CreatePdfTotalnventoryRequest();
    request.title = this.pdfTitle;
    request.shop = this.shop.name;
    request.rows.push({
      total: 'Total',
      ean: 'Ean',
      description: 'Description'
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
  generatePdfEpc() {
    const request: CreatePdfTotalnventoryRequest = new CreatePdfTotalnventoryRequest();
    request.title = this.pdfTitle;
    request.shop = this.pdfTitle;
    for (const product of this.allProducts) {
      request.rows.push({
        EPC: product.product.ean,
        description: product.product.description
      });
    }
    this.inventarioReal.createPdf(request);
  }

  filterEmployees(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.employees = this.allEmployees.filter((employee: Employee ) => {
        return (
            employee.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.employees = this.allEmployees;
    }
  }

}

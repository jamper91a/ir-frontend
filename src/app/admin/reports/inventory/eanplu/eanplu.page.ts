import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Product} from '../../../../../pojo/Product';
import {GetProductInShopByEanPluRequest} from '../../../../../webServices/request/GetProductInShopByEanPluRequest';
import {GetProductInShopByEanPluResponse} from '../../../../../webServices/response/getProductInShopByEanPluResponse';
import {Employee} from '../../../../../pojo/Employee';
import {Shop} from '../../../../../pojo/Shop';
import {CreatePdfEanPluInventoryRequest} from '../../../../../webServices/request/CreatePdfEanPluInventoryRequest';

@Component({
  selector: 'app-eanplu',
  templateUrl: './eanplu.page.html',
  styleUrls: ['./eanplu.page.scss'],
})
export class EanpluPage implements OnInit {

  public product: Product;
  public request: GetProductInShopByEanPluRequest = new GetProductInShopByEanPluRequest();
  public result: GetProductInShopByEanPluResponse = new GetProductInShopByEanPluResponse();
  public employees: Employee[] = [];
  public allEmployees: Employee[] = [];
  public step = 1;
  public shop: Shop;
  public columnNames;
  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private route: ActivatedRoute,
      private router: Router,
      private navCtrl: NavController
  ) {
    this.allEmiterService.onNewTitle('ean_plu_inventory');
    this.translate.get(['ean_plu_inventory', 'id', 'epc', 'zone']).subscribe((values) => {
      this.columnNames = values;
    });
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
    if (this.product) {
      try {
        this.request.employee = employee;
        this.result = await this.inventarioReal.getProductInShopByEanPlu(this.request);
      } catch (e) {
        this.navCtrl.navigateBack('admin/reports');
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
  generateEanPluPdf() {
    const request: CreatePdfEanPluInventoryRequest = new CreatePdfEanPluInventoryRequest();
    request.title = this.columnNames.ean_plu_inventory;
    request.shop = this.shop.name;
    request.ean = this.product.ean;
    request.rows.push({
      epc: this.columnNames.epc,
      zone: this.columnNames.zone
    });
    for (const product of this.result.data) {
      request.rows.push({
        epc: product.epc.epc,
        zone: product.zone.name
      });
    }
    this.inventarioReal.createPdf(request);
  }

}

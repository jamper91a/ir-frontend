import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {ReturnReportRequest} from '../../../../../webServices/request/ReturnReportRequest';
import {GetRotationUnitsResponse} from '../../../../../webServices/response/GetRotationUnitsResponse';
import {ProductHasZone} from '../../../../../pojo/ProductHasZone';
import {Shop} from '../../../../../pojo/Shop';
import {Employee} from '../../../../../pojo/Employee';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {Util} from '../../../../../providers/util';
import {CreatePdfReturnUnitsRequest} from '../../../../../webServices/request/CreatePdfReturnUnitsRequest';

@Component({
  selector: 'app-suppliersreturn',
  templateUrl: './suppliersreturn.page.html',
  styleUrls: ['./suppliersreturn.page.scss'],
})
export class SuppliersreturnPage implements OnInit {
  public request: ReturnReportRequest;
  public response: GetRotationUnitsResponse;
  public products: ProductHasZone[];
  public allProducts: ProductHasZone[] = [];

  public step = 1;
  public shop: Shop;
  public employees: Employee[] = [];
  public allEmployees: Employee[] = [];
  public columnNames;
  public tab = 'ean_plu';
  public visual = false;
  public date: Date = new Date();

  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute,
      public util: Util
  ) {
    this.allEmiterService.onNewTitle('suppliers_return');
    this.translate.get(['suppliers_return', 'total',
      'ean_plu', 'description', 'supplier']).subscribe((values) => {
      this.columnNames = values;
    });
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const aux = this.router.getCurrentNavigation().extras.state.request;
        if (aux) {
          this.request = new ReturnReportRequest();
          this.request.type = '2';
          this.request.firstDate = aux.initialDate;
          this.request.secondDate = aux.finalDate;
        } else {
          this.navCtrl.navigateBack('admin/reports');
        }
      }
    });
  }

  ngOnInit() {
    this.getData();
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('suppliers_return');
    if (!this.request) {
      this.navCtrl.navigateBack('admin/reports');
    }
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

  async getReportClientsReturn(employee: Employee) {
    this.step = 2;
    this.shop = employee.shop;
    this.request.employee = employee;
    if (this.request) {
      try {
        this.response = await this.inventarioReal.getReturnsByType(this.request);
        this.products = this.response.data;
        if (this.products.length > 0) {
          for (const phz of this.products) {
            phz.total = 1;
            phz.vendidas = 0;
            this.addProduct(phz);
          }
        }
      } catch (e) {
        // this.util.showToast(e);
      }
    }
  }

  addProduct(product: ProductHasZone) {
    if (product.sell != null && product.sell.id > 1) {
      product.vendidas = product.vendidas + 1;
    }
    if (this.allProducts.length === 0) {
      this.allProducts.push(product);
    } else {
      for (const phz of this.allProducts) {
        if (phz.product.id === product.product.id) {
          phz.total++;
          return;
        }
      }
      this.allProducts.push(product);
    }
  }

  filterEmployees(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.employees = this.allEmployees.filter((employee: Employee) => {
        return (
            employee.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.employees = this.allEmployees;
    }
  }

  generatePdfClientsReturn() {
    const request: CreatePdfReturnUnitsRequest = new CreatePdfReturnUnitsRequest();
    request.title = this.columnNames.suppliers_return;
    request.shop = this.shop.name;
    request.rows.push({
      total: this.columnNames.total,
      ean_plu: this.columnNames.ean_plu,
      description: this.columnNames.description,
      supplier: this.columnNames.supplier
    });
    for (const product of this.allProducts) {
      request.rows.push({
        total: product.total,
        ean_plu: product.product.ean,
        description: product.product.description,
        supplier: product.product.supplier.name,
      });
    }
    this.inventarioReal.createPdf(request);
  }

}

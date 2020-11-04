import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {ProductHasZone} from '../../../../../pojo/ProductHasZone';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {ActivatedRoute, Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {RotationUnitsReportRequest} from '../../../../../webServices/request/RotationUnitsReportRequest';
import {GetRotationUnitsResponse} from '../../../../../webServices/response/GetRotationUnitsResponse';
import {Shop} from '../../../../../pojo/Shop';
import {Employee} from '../../../../../pojo/Employee';
import {Util} from '../../../../../providers/util';
import {CreatePdfRotationInventoryRequest} from '../../../../../webServices/request/CreatePdfRotationInventoryRequest';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.page.html',
  styleUrls: ['./rotation.page.scss'],
})
export class RotationPage implements OnInit {
  public request: RotationUnitsReportRequest;
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
    this.allEmiterService.onNewTitle('rotation_inventory');
    this.translate.get(['rotation_inventory', 'total_physic',
      'sold', 'difference', 'ean_plu', 'description']).subscribe((values) => {
      this.columnNames = values;
    });
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        const aux = this.router.getCurrentNavigation().extras.state.request;
        if (aux) {
          this.request = new RotationUnitsReportRequest();
          this.request.firstDate = aux.initialDate;
          this.request.secondDate = aux.finalDate;
          console.log(this.request);
        } else {
          this.navCtrl.navigateBack('admin/reports');
        }
        console.log(this.request);
      }
    });
  }

  ngOnInit() {
    this.getData();
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('rotation_inventory');
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

  async getReportRotationUnits(employee: Employee) {
    this.step = 2;
    this.shop = employee.shop;
    this.request.employee = employee;
    if (this.request) {
      try {
        this.response = await this.inventarioReal.getRotationUnits(this.request);
        console.log(this.response.data);
        this.products = [];
        this.products = this.response.data;
        console.log('this.products');
        console.log(this.products);
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

  generatePdfRotationUnits() {
    const request: CreatePdfRotationInventoryRequest = new CreatePdfRotationInventoryRequest();
    request.title = this.columnNames.rotation_inventory;
    request.shop = this.shop.name;
    request.rows.push({
      total_physic: this.columnNames.total_physic,
      sold: this.columnNames.sold,
      difference: this.columnNames.difference,
      ean_plu: this.columnNames.ean_plu,
      description: this.columnNames.description
    });
    for (const product of this.allProducts) {
      request.rows.push({
        total_physic: product.total,
        sold: product.vendidas,
        difference: product.total - product.vendidas,
        ean_plu: product.product.ean,
        description: product.product.description
      });
    }
    this.inventarioReal.createPdf(request);
  }

}

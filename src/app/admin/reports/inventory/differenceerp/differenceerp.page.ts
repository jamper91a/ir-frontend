import {Component, OnInit} from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';
import {GetDiferenceInventoryErpResponse} from '../../../../../webServices/response/GetDiferenceInventoryErpResponse';
import {Shop} from '../../../../../pojo/Shop';
import {Employee} from '../../../../../pojo/Employee';
import {DiferenceInventoryErp} from '../../../../../pojo/DiferenceInventoryErp';
import {Util} from '../../../../../providers/util';
// tslint:disable-next-line:max-line-length
import {CreatePdfDifferencePhysicalErpInventoryRequest} from '../../../../../webServices/request/CreatePdfDifferencePhysicalErpInventoryRequest';

@Component({
  selector: 'app-differenceerp',
  templateUrl: './differenceerp.page.html',
  styleUrls: ['./differenceerp.page.scss'],
})
export class DifferenceerpPage implements OnInit {
  public response: GetDiferenceInventoryErpResponse;
  public products: DiferenceInventoryErp[];
  public allProducts: DiferenceInventoryErp[];
  public step = 1;
  public shop: Shop;
  public employees: Employee[] = [];
  public allEmployees: Employee[] = [];
  public columnNames;
  public tab = 'total';
  public visual = false;
  public date: Date = new Date();

  constructor(
      private allEmiterService: AllEmiterService,
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      public util: Util
  ) {
    this.translate.get(['difference_physical_and_erp_inventories', 'total_physic',
      'total_erp', 'difference', 'ean_plu', 'description']).subscribe((values) => {
      this.columnNames = values;
    });
    this.allEmiterService.onNewTitle('difference_physical_and_erp_inventories');
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

  async getReportDifferenceErp(employee: Employee) {
    this.step = 2;
    this.shop = employee.shop;
    try {
      this.response = await this.inventarioReal.getDiferenceInventoryErp(employee);
      if (this.response && this.response.data.length > 0) {
        this.products = this.response.data;
      }
    } catch (e) {
      // this.util.showToast(e);
    }
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('difference_physical_and_erp_inventories');
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

  generatePdfDifferenceErp() {
    const request: CreatePdfDifferencePhysicalErpInventoryRequest = new CreatePdfDifferencePhysicalErpInventoryRequest();
    request.title = this.columnNames.difference_physical_and_erp_inventories;
    request.shop = this.shop.name;
    request.rows.push({
      total_physic: this.columnNames.total_physic,
      total_erp: this.columnNames.total_erp,
      difference: this.columnNames.difference,
      ean_plu: this.columnNames.ean_plu,
      description: this.columnNames.description
    });
    for (const product of this.products) {
      request.rows.push({
        total_physic: product.total,
        total_erp: product.erp,
        difference: product.total - product.erp,
        ean_plu: product.ean,
        description: product.description
      });
    }
    this.inventarioReal.createPdf(request);
  }

}

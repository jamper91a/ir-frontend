import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {ActivatedRoute, Router} from '@angular/router';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {Supplier} from '../../../../pojo/Supplier';
import {UpdateSupplierRequest} from '../../../../webServices/request/UpdateSupplierRequest';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.page.html',
  styleUrls: ['./edit-supplier.page.scss'],
})
export class EditSupplierPage implements OnInit {

  public supplier: Supplier;
  public request: UpdateSupplierRequest;
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private router: Router,
              private allEmiterService: AllEmiterService) {
    this.request = new UpdateSupplierRequest();
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.supplier = this.router.getCurrentNavigation().extras.state.supplier;
        this.request.putData(this.supplier);
        if (!this.supplier) {
          this.navCtrl.navigateBack(['admin/suppliers' ]);
        }
        this.allEmiterService.onNewTitle(this.supplier.name);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (this.supplier) {
    } else {
      this.navCtrl.navigateBack(['admin/suppliers' ]);
    }

  }
  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateSupplier(this.request);
      this.util.showToast('supplier_updated');
      this.navCtrl.navigateBack(['admin/suppliers' ]);
    } catch (e) {
      console.log(e);
      this.util.showToast(e);
    }
  }

}

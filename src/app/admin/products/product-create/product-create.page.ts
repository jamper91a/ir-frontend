import {Component, OnInit} from '@angular/core';
import {CreateProductRequest} from '../../../../webServices/request/CreateProductRequest';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {GetSuppliersByCompanyResponse} from '../../../../webServices/response/GetSuppliersByCompanyResponse';
import {Supplier} from '../../../../pojo/Supplier';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
  styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit {

  public request: CreateProductRequest = new CreateProductRequest();
  public suppliers: Supplier[];
  public imagePath;
  imgURL: any = '/assets/no-preview-available.png';
  constructor(
      private inventarioReal: InventarioReal,
      private platform: Platform,
      private util: Util,
      private allEmiterService: AllEmiterService,
      private navCtrl: NavController,
  ) {
    this.allEmiterService.onNewTitle('new_product');
  }

  ngOnInit() {
    if (environment.test) {
      this.request.product.ean = this.util.generateUuid();
      this.request.product.plu = this.util.generateUuid();
      this.request.product.plu2 = this.util.generateUuid();
      this.request.product.plu3 = this.util.generateUuid();
      this.request.product.branch = this.util.generateName();
      this.request.product.gender = this.util.generateName();
      this.request.product.color = this.util.generateColor();
      this.request.product.size = this.util.generateName();
      this.request.product.category = this.util.generateName();
      this.request.product.description = this.util.generateWord();
      this.request.product.cost_price = this.util.generateNumber();
      this.request.product.sell_price = this.util.generateNumber();
    }
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('new_product');
    this.getSuppliers();
  }

  handleFileInput(files: FileList) {
    this.request.photo = files[0];
    this.preview(files);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

  async getSuppliers() {
    try {
      const response: GetSuppliersByCompanyResponse = await this.inventarioReal.getSuppliers();
      this.suppliers = response.data;
    } catch (e) {
      // this.util.showToast(e);
    }
  }

  async doCreate() {
    try {
      console.log(this.request.product);
      this.request.validate();
      await this.inventarioReal.createProduct(this.request);
      this.util.showToast('product_created');
      this.navCtrl.navigateBack(['admin/products' ]);
    } catch (e) {
      if (e.code && e.code === 'VAL_FAIL') {
        this.util.showToast(e.message);
      } else {
        this.util.showToast(e.toString());
      }

    }
  }

}

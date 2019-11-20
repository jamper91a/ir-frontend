import { Component, OnInit } from '@angular/core';
import {CreateProductRequest} from '../../../../webServices/request/CreateProductRequest';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {GetSuppliersByCompanyResponse} from '../../../../webServices/response/GetSuppliersByCompanyResponse';
import {Supplier} from '../../../../pojo/Supplier';

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
      this.util.showToast(e);
    }
  }

  async doCreate() {
    try {
      this.request.validate();
      await this.inventarioReal.createProduct(this.request);
      this.util.showToast('product_created');
      this.navCtrl.navigateBack(['admin/products' ]);
    } catch (e) {
      this.util.showToast(e);
    }
  }

}

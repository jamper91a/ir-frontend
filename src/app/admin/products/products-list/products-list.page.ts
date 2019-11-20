import { Component, OnInit } from '@angular/core';
import {Supplier} from '../../../../pojo/Supplier';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {NavigationExtras} from '@angular/router';
import {Product} from '../../../../pojo/Product';
import {GetProductsResponse} from '../../../../webServices/response/GetProductsResponse';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  public products: Product[];
  public allProducts: Product[];
  constructor(
      private allEmiterService: AllEmiterService,
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private navCtrl: NavController
  ) {
    this.allEmiterService.onNewTitle('products');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('products');
    const dialog = await this.util.showDialog('');
    this.inventarioReal.showDialog = false;
    await this.getProducts();
    this.inventarioReal.showDialog = true;
    await dialog.dismiss();
  }

  async getProducts() {
    try {
      const response: GetProductsResponse = await this.inventarioReal.getProducts();
      this.products = response.data;
      this.allProducts = response.data;
    } catch (e) {
      this.util.showToast(e);
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.products = this.allProducts.filter((product: Product) => {
        return (
            product.description.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.allProducts = this.products;
    }
  }
  goToProduct(product: Product) {
    const navigationExtras: NavigationExtras = {
      state: {
        product
      }
    };
    this.navCtrl.navigateForward(['admin/products/edit/' + product.id], navigationExtras);
  }

}

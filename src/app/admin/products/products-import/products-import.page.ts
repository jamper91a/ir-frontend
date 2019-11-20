/* tslint:disable:variable-name */
import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {AlertController, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {Product} from '../../../../pojo/Product';
import {TranslateService} from '@ngx-translate/core';
import {CreateProductsRequest} from '../../../../webServices/request/CreateProductsRequest';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.page.html',
  styleUrls: ['./products-import.page.scss'],
})
export class ProductsImportPage implements OnInit {
  file: any;
  fileString: any;
  columns: ColumnsTitle[];
  errorFile: Error;
  constructor(
      private inventarioReal: InventarioReal,
      private platform: Platform,
      private util: Util,
      private allEmiterService: AllEmiterService,
      private navCtrl: NavController,
      public translate: TranslateService,
      public alertController: AlertController,
  ) {
    this.allEmiterService.onNewTitle('import_products');
  }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('import_products');
  }

  fileChanged(e) {
    this.file = e.target.files[0];
    try {
      this.readDocument();
    } catch (e) {
      alert(e);
    }
  }

  readDocument() {
    const fileReader = new FileReader();

    try {
      fileReader.readAsText(this.file);
      fileReader.onloadend = (e) => {

        // By lines
        // @ts-ignore
        const lines: string[] = fileReader.result.split('\n');
        let numColumns = 0;

        try {
          for (const line of lines) {
            const columns = line.split(';');
            if (numColumns === 0) {
              numColumns = columns.length;
            } else {
              if (numColumns !== columns.length) {
                this.errorFile = new Error('columns_not_valid');
                throw Error('columns_not_valid');
              }
            }
          }
        } catch (e) {
          alert(e);
        }
        const titles = lines[0].split(';');
        let pos = 0;
        this.columns = [];
        for (const title of titles) {
          this.columns.push({
            pos,
            name: title,
            field: ''
          });
          pos++;
        }
        lines.shift();
        this.fileString = lines;
      };
    } catch (e) {
      alert(e);
    }
  }

  doUpload() {
    console.log(this.columns);
    const listProducts: Product[] = [];
    for (const line of this.fileString) {
      let pos = 0;
      const auxColumns = line.split(';');
      const product: Product = new Product();
      pos = this.findColumnPos('ean');
      product.ean = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('plu');
      product.plu = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('plu2');
      product.plu2 = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('plu3');
      product.plu3 = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('branch');
      product.branch = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('gender');
      product.gender = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('color');
      product.color = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('size');
      product.size = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('category');
      product.category = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('description');
      product.description = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('amount');
      product.amount = (pos > -1) ? parseInt(auxColumns[pos], 0) : 0;
      pos = this.findColumnPos('image');
      product.imagen = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('cost_price');
      product.cost_price = (pos > -1) ? parseFloat(auxColumns[pos]) : 0;
      pos = this.findColumnPos('sell_price');
      product.sell_price = (pos > -1) ? parseFloat(auxColumns[pos]) : 0;
      pos = this.findColumnPos('company');
      product.company = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('supplier');
      product.supplier = (pos > -1) ? auxColumns[pos] : '';
      listProducts.push(product);
    }
    this.translate.get(['import_product_messages', 'import_products' , 'confirm', 'cancel']).subscribe(
        async (values) => {
          let message = values.import_product_messages;
          message = message.replace('{amount}', (listProducts.length - 1));
          const alert = await this.alertController.create({
            header: values.import_products,
            message,
            buttons: [
              {
                text: values.cancel,
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  this.navCtrl.navigateBack('admin/products');
                }
              }, {
                text: values.confirm,
                handler: async () => {
                  try {
                    const request: CreateProductsRequest = new CreateProductsRequest();
                    request.products = listProducts;
                    await this.inventarioReal.createProducts(request);
                    this.util.showToast('product_created');
                    this.navCtrl.navigateBack(['admin/products' ]);
                  } catch (e) {
                    this.util.showToast(e.toString());
                  }
                }
              }
            ]
          });
          await alert.present();
        }
    );
  }

  private findColumnPos(name: string): number {
    for (const column of this.columns) {
      if (column.field === name) {
        return column.pos;
      }
    }
    return -1;
  }

}

class ColumnsTitle {
  public pos: number;
  public name: string;
  public field: string;


  constructor() {
  }
}

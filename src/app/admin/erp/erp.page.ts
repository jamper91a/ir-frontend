import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../providers/inventarioReal';
import {AlertController, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {AllEmiterService} from '../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {CreateErpReportRequest} from '../../../webServices/request/CreateErpReportRequest';

@Component({
  selector: 'app-erp',
  templateUrl: './erp.page.html',
  styleUrls: ['./erp.page.scss'],
})
export class ErpPage implements OnInit {

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
    this.allEmiterService.onNewTitle('erp_inventory');
  }

  ngOnInit() {
  }
  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('erp_inventory');
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
      fileReader.onloadend = () => {

        // By lines
        // @ts-ignore
        const lines: string[] = fileReader.result.split('\n');
        let numColumns = 0;

        try {
          for (const line of lines) {
            const columns = line.split(',');
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
        const titles = lines[0].split(',');
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
    const listProducts: ProductErp[] = [];
    for (const line of this.fileString) {
      let pos = 0;
      const auxColumns = line.split(',');
      const product: ProductErp =  new ProductErp();
      pos = this.findColumnPos('ean');
      product.ean = (pos > -1) ? auxColumns[pos] : '';
      pos = this.findColumnPos('amount');
      product.total = (pos > -1) ? parseInt(auxColumns[pos], 0) : 0;
      listProducts.push(product);
    }
    console.log(listProducts);
    this.translate.get(['import_erp_report_messages', 'import_erp_report' , 'confirm', 'cancel']).subscribe(
        async (values) => {
          let message = values.import_erp_report_messages;
          message = message.replace('{amount}', (listProducts.length));
          const alert = await this.alertController.create({
            header: values.import_erp_report,
            message,
            buttons: [
              {
                text: values.cancel,
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                }
              }, {
                text: values.confirm,
                handler: async () => {
                  try {
                    const request: CreateErpReportRequest = new CreateErpReportRequest();
                    request.products = listProducts;
                    await this.inventarioReal.createErpReport(request);
                    this.util.showToast('erp_report_created');
                    this.navCtrl.navigateBack(['admin' ]);
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
class ProductErp {
  public total: number;
  public ean: string;


  constructor() {
  }
}

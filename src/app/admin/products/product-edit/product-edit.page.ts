import {Component, OnInit} from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {ActivatedRoute, Router} from '@angular/router';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {Product} from '../../../../pojo/Product';
import {UpdateProductRequest} from '../../../../webServices/request/UpdateProductRequest';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {

  public product: Product;
  public request: UpdateProductRequest;
  public imagePath;
  imgURL: any = '/assets/no-preview-available.png';
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private router: Router,
              private allEmiterService: AllEmiterService) {
    this.request = new UpdateProductRequest();
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.product = this.router.getCurrentNavigation().extras.state.product;
        this.request.putData(this.product);
        this.imgURL = this.util.url + this.product.imagen;
        console.log('imgURL', this.imgURL);
        if (!this.product) {
          this.navCtrl.navigateBack(['admin/products' ]);
        }
        this.allEmiterService.onNewTitle(this.product.ean);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (this.product) {
    } else {
      this.navCtrl.navigateBack(['admin/products' ]);
    }

  }
  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateProduct(this.request);
      this.util.showToast('product_updated');
      this.navCtrl.navigateBack(['admin/products' ]);
    } catch (e) {
      this.util.showToast(e);
    }
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

}

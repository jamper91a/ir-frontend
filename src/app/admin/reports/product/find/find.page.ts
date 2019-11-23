import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';
import {TranslateService} from '@ngx-translate/core';
import {InventarioReal} from '../../../../../providers/inventarioReal';
import {Util} from '../../../../../providers/util';
import {GetProductByEanPluRequest} from '../../../../../webServices/request/GetProductByEanPluRequest';
import {GetProductByEanPluResponse} from '../../../../../webServices/response/GetProductByEanPluResponse';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-find',
  templateUrl: './find.page.html',
  styleUrls: ['./find.page.scss'],
})
export class FindPage implements OnInit {

  public request: GetProductByEanPluRequest;
  public result: GetProductByEanPluResponse = null;
  public data: any;
  constructor(private allEmiterService: AllEmiterService,
              private translate: TranslateService,
              private inventarioReal: InventarioReal,
              private route: ActivatedRoute,
              private router: Router,
              private util: Util) {

    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
        this.allEmiterService.onNewTitle(this.data.title);
      }
    });
  }

  ngOnInit() {
    this.request = new GetProductByEanPluRequest();
  }

  async ionViewDidEnter() {
    if (this.data) {
      this.allEmiterService.onNewTitle(this.data.title);
    }
  }

  async doFind() {
    try {
      this.result = await this.inventarioReal.getProductByEanPlu(this.request);
    } catch (e) {
      this.util.showToast(e);
    }
  }

}

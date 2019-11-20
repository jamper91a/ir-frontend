import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../services/all-emiter-service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('products');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('products');
  }

}

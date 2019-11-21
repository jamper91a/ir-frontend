import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-suppliersreturn',
  templateUrl: './suppliersreturn.page.html',
  styleUrls: ['./suppliersreturn.page.scss'],
})
export class SuppliersreturnPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('suppliers_return');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('suppliers_return');
  }

}

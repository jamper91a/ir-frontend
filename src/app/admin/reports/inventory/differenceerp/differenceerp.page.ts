import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-differenceerp',
  templateUrl: './differenceerp.page.html',
  styleUrls: ['./differenceerp.page.scss'],
})
export class DifferenceerpPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('difference_physical_and_erp_inventories');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('difference_physical_and_erp_inventories');
  }

}

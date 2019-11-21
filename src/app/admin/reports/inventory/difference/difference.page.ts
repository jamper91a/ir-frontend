import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-difference',
  templateUrl: './difference.page.html',
  styleUrls: ['./difference.page.scss'],
})
export class DifferencePage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('difference_physical_inventories');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('difference_physical_inventories');
  }

}

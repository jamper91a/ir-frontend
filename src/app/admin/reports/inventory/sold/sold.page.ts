import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-sold',
  templateUrl: './sold.page.html',
  styleUrls: ['./sold.page.scss'],
})
export class SoldPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('sold_units');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('sold_units');
  }

}

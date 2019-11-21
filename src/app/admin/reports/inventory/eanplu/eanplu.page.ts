import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-eanplu',
  templateUrl: './eanplu.page.html',
  styleUrls: ['./eanplu.page.scss'],
})
export class EanpluPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('total_inventory');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('total_inventory');
  }

}

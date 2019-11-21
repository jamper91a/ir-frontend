import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-homologue',
  templateUrl: './homologue.page.html',
  styleUrls: ['./homologue.page.scss'],
})
export class HomologuePage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('homologue_difference_physical_inventories');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('homologue_difference_physical_inventories');
  }

}

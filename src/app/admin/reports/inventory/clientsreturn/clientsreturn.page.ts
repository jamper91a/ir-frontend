import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-clientsreturn',
  templateUrl: './clientsreturn.page.html',
  styleUrls: ['./clientsreturn.page.scss'],
})
export class ClientsreturnPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('clients_return');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('clients_return');
  }

}

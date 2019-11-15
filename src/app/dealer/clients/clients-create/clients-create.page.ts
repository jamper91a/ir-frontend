import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {CreateAdminRequest} from '../../../../webServices/request/CreateAdminRequest';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.page.html',
  styleUrls: ['./clients-create.page.scss'],
})
export class ClientsCreatePage implements OnInit {

  public request: CreateAdminRequest;
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      public events: Events,
  ) {
    this.request = new CreateAdminRequest();
    this.events.publish('tittle', 'new_cliente');
  }

  async ngOnInit() {

  }
  async create() {
    try {
      this.request.validate();
      await this.inventarioReal.createAdmin(this.request);
      this.util.showToast('client_created');
      this.request.clean();
    } catch (e) {
      this.util.showToast(e.toString());
    }
  }

}

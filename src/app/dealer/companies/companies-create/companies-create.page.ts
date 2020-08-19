import { Component, OnInit } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {CreateAdminRequest} from '../../../../webServices/request/CreateAdminRequest';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-companies-create',
  templateUrl: './companies-create.page.html',
  styleUrls: ['./companies-create.page.scss'],
})
export class CompaniesCreatePage implements OnInit {

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
    if (environment.test) {
      this.request.user.username = this.util.generateEmail();
      this.request.user.password = this.util.generatePassword();
      this.request.user.rpassword = this.util.generatePassword();
      this.request.user.name = this.util.generateName();
      this.request.employee.company.name = this.util.generateName();
    }
  }

  async ionViewDidEnter() {
    this.events.publish('tittle', 'new_cliente');
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

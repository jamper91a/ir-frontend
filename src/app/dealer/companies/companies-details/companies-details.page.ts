import { Component, OnInit } from '@angular/core';
import {UpdateDealerRequest} from '../../../../webServices/request/UpdateDealerRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {Util} from '../../../../providers/util';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController} from '@ionic/angular';
import {Company} from '../../../../pojo/Company';
import {UpdateAdminRequest} from '../../../../webServices/request/UpdateAdminRequest';

@Component({
  selector: 'app-companies-details',
  templateUrl: './companies-details.page.html',
  styleUrls: ['./companies-details.page.scss'],
})
export class CompaniesDetailsPage implements OnInit {

  data: Company;
  request: UpdateAdminRequest = new UpdateAdminRequest();
  companyId: string;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private util: Util,
      private inventarioReal: InventarioReal,
      private navCtrl: NavController,
      public events: Events,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.company;
        this.request.putData(this.data);
        this.events.publish('tittle', this.data.name);
      }
      this.companyId = this.route.snapshot.paramMap.get('id');
      if (!this.data) {
        this.getCompany(this.companyId);
      }
    });
  }

  getCompany(id: string) {
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.events.publish('tittle', this.data.name);
  }

  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateAdmin(this.request);
      this.util.showToast('dealer_updated');
      this.navCtrl.navigateBack('dealer/companies/list');
    } catch (e) {
      this.util.showToast(e.toString());
    }

  }

  async doDelete() {

  }

}

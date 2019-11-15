import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../pojo/Company';
import {UpdateAdminRequest} from '../../../../webServices/request/UpdateAdminRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {Util} from '../../../../providers/util';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, Platform} from '@ionic/angular';

@Component({
  selector: 'app-tags-create-step-two',
  templateUrl: './tags-create-step-two.page.html',
  styleUrls: ['./tags-create-step-two.page.scss'],
})
export class TagsCreateStepTwoPage implements OnInit {

  public data: Company;
  public request: UpdateAdminRequest = new UpdateAdminRequest();
  public companyId: string;
  public disabled = false;
  public separator = ';';
  public tags = '';
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private util: Util,
      private inventarioReal: InventarioReal,
      public events: Events,
      public platform: Platform,
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

  async getCompany(id: string) {
    this.platform.ready().then(async () => {
      const response = await this.inventarioReal.getCompanyById(id);
      this.data = response.data;
      this.events.publish('tittle', this.data.name);
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (!this.data) {
      this.getCompany(this.companyId);
    }
  }

  async addTags() {
    console.log('addTags');
    // try {
    //   this.request.validate();
    //   await this.inventarioReal.updateAdmin(this.request);
    //   this.util.showToast('dealer_updated');
    //   this.navCtrl.navigateBack('dealer/companies/list');
    // } catch (e) {
    //   this.util.showToast(e.toString());
    // }
    this.disabled = true;
    const allTags = this.tags.split(this.separator);
    const auxSet = new Set(allTags);
    const finalTags = Array.from(auxSet);
    alert(allTags.length);
    alert(finalTags.length);
  }

  async doDelete() {

  }

}

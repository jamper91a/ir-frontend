import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../pojo/Company';
import {UpdateAdminRequest} from '../../../../webServices/request/UpdateAdminRequest';
import {ActivatedRoute, Router} from '@angular/router';
import {Util} from '../../../../providers/util';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {AlertController, Events, NavController, Platform} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Epc} from '../../../../pojo/Epc';
import {CreateEpcsRequest} from '../../../../webServices/request/CreateEpcsRequest';
import {Dealer} from '../../../../pojo/Dealer';

@Component({
  selector: 'app-tags-create-step-two',
  templateUrl: './tags-create-step-two.page.html',
  styleUrls: ['./tags-create-step-two.page.scss'],
})
export class TagsCreateStepTwoPage implements OnInit {

  public data: Company;
  public request: CreateEpcsRequest = new CreateEpcsRequest();
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
      public translate: TranslateService,
      public alertController: AlertController,
      private navCtrl: NavController,
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.company;
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

  async validateTags() {
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

    this.translate.get(['add_tags_tittle', 'add_tags_message' , 'confirm', 'cancel']).subscribe(
        async (values) => {
          let message = values.add_tags_message;
          message = message.replace('{tags}', (allTags.length - 1));
          message = message.replace('{finalTags}', (finalTags.length - 1));
          message = message.replace('{company}', this.data.name);
          const alert = await this.alertController.create({
            header: values.add_tags_tittle,
            message,
            buttons: [
              {
                text: values.cancel,
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  this.disabled = false;
                }
              }, {
                text: values.confirm,
                handler: () => {
                  this.addTags(finalTags);
                }
              }
            ]
          });
          await alert.present();
        }
    );

  }

  async addTags(tags) {
    const epcs: Epc[] = [];
    const dealer = JSON.parse(this.util.getPreference('dealer'));
    console.log(this.data);
    for (const tag of tags) {
      const auxEpc: Epc = new Epc();
      const company: Company = new Company();
      company.id = this.data.id;
      const dealer2: Dealer = new Dealer();
      dealer2.id = dealer.id;
      auxEpc.epc = tag;
      auxEpc.company = company;
      auxEpc.dealer = dealer2;
      auxEpc.state = 0;
      epcs.push(auxEpc);
    }

    try {
      this.request.epcs = epcs;
      this.request.validate();
      await this.inventarioReal.createEpc(this.request);
      this.util.showToast('epcs_created');
      this.navCtrl.navigateBack('dealer/tags/create');
    } catch (e) {
      this.util.showToast(e.toString());
    }
  }

}

import { Component } from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {GetAllCompaniesByDealerResponse} from '../../../../webServices/response/GetAllCompaniesByDealerResponse';
import {Company} from '../../../../pojo/Company';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-tags-create',
  templateUrl: './tags-create.page.html',
  styleUrls: ['./tags-create.page.scss'],
})
export class TagsCreatePage {

  public dealer: GetAllCompaniesByDealerResponse;
  public companies: Company[];
  public allCompanies: Company[];
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private router: Router,
      private navCtrl: NavController,
      public events: Events,
  ) {
    this.events.publish('tittle', 'tags');
  }

  async ionViewDidEnter() {
    this.platform.ready().then(async () => {
      await this.getCompanies();
    });
  }

  async getCompanies() {
    try {
      this.dealer = null;
      this.dealer = await this.inventarioReal.getAllCompaniesByDealer(true);
      this.companies = this.dealer.data.companies;
      this.allCompanies = this.dealer.data.companies;
    } catch (e) {
      console.error(e);
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.companies = this.allCompanies.filter((company: Company) => {
        return (
            company.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1 ||
            company.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.companies = this.allCompanies;
    }
  }

  goToCompany(company: Company) {
    const navigationExtras: NavigationExtras = {
      state: {
        company
      }
    };
    this.navCtrl.navigateForward(['dealer/tags/create/step-2/' + company.id], navigationExtras);
  }

}

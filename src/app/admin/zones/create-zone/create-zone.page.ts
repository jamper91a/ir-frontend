import { Component, OnInit } from '@angular/core';
import {Shop} from '../../../../pojo/Shop';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {CreateZoneRequest} from '../../../../webServices/request/CreateZoneRequest';
import {Zone} from '../../../../pojo/Zone';
import {GetZonesByShopResponse} from '../../../../webServices/response/GetZonesByShopResponse';

@Component({
  selector: 'app-create-zone',
  templateUrl: './create-zone.page.html',
  styleUrls: ['./create-zone.page.scss'],
})
export class CreateZonePage implements OnInit {

  public shop: Shop;
  public request: CreateZoneRequest;
  public zones: Zone[];
  public allZones: Zone[];
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private router: Router,
              public events: Events) {
    this.request = new CreateZoneRequest();
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.shop = this.router.getCurrentNavigation().extras.state.shop;
        this.request.shop = this.shop.id;
        if (!this.shop) {
          this.navCtrl.navigateBack(['admin/zones' ]);
        }
        this.events.publish('tittle', this.shop.name);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (this.shop) {
      const dialog = await this.util.showDialog('');
      this.inventarioReal.showDialog = false;
      await this.getZones();
      this.inventarioReal.showDialog = true;
      await dialog.dismiss();
    } else {
      this.navCtrl.navigateBack(['admin/zones' ]);
    }

  }
  async doCreate() {
    try {
      this.request.validate();
      await this.inventarioReal.createZone(this.request);
      this.util.showToast('zone_created');
      this.getZones();
    } catch (e) {
      this.util.showToast(e);
    }
  }

  async getZones() {
    try {
      const response: GetZonesByShopResponse = await this.inventarioReal.getZonesByShop(this.shop.id + '');
      console.log(response);
      this.zones = response.data;
      this.allZones = response.data;
    } catch (e) {
      this.util.showToast(e);
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.zones = this.allZones.filter((zone: Zone ) => {
        return (
            zone.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.allZones = this.zones;
    }
  }
  goToZone(shop: Shop) {
    const navigationExtras: NavigationExtras = {
      state: {
        shop
      }
    };
    this.navCtrl.navigateForward(['admin/zone/edit/' + shop.id], navigationExtras);
  }

}

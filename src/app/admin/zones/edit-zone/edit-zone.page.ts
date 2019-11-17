import { Component, OnInit } from '@angular/core';
import {Zone} from '../../../../pojo/Zone';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {ActivatedRoute, Router} from '@angular/router';
import {UpdateZoneRequest} from '../../../../webServices/request/UpdateZoneRequest';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.page.html',
  styleUrls: ['./edit-zone.page.scss'],
})
export class EditZonePage implements OnInit {

  public zone: Zone;
  public request: UpdateZoneRequest;
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private router: Router,
              public events: Events) {
    this.request = new UpdateZoneRequest();
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.zone = this.router.getCurrentNavigation().extras.state.zone;
        this.request.putData(this.zone);
        if (!this.zone) {
          this.navCtrl.navigateBack(['admin/zones' ]);
        }
        this.events.publish('tittle', this.zone.name);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (this.zone) {
    } else {
      this.navCtrl.navigateBack(['admin/zones' ]);
    }

  }
  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateZone(this.request);
      this.util.showToast('zone_created');
      this.navCtrl.navigateBack(['admin/zones' ]);
    } catch (e) {
      this.util.showToast(e);
    }
  }



}

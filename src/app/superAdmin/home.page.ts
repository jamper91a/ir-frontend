import { Component } from '@angular/core';
import {AlertController, Events} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Util} from '../../providers/util';
import {Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public tittle = '';
  public selectedPath = '';
  constructor(
      public events: Events,
      public translate: TranslateService,
      public alertController: AlertController,
      public util: Util,
      private router: Router
  ) {
    this.events.subscribe('tittle', (tittle) => {
      translate.get(tittle).subscribe(
          value => {
            this.tittle = value;
          }
      );
      this.router.events.subscribe((event: RouterEvent) => {
        if (event && event.url) {
          this.selectedPath = event.url;
        }
      });
    });
  }

  async logOut() {
    console.log('logOut');
    this.translate.get(['log_out', 'are_you_sure' , 'confirm', 'cancel']).subscribe(
        async (values) => {
          console.log(values);
          const alert = await this.alertController.create({
            header: values.log_out,
            message: values.are_you_sure,
            buttons: [
              {
                text: values.cancel,
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                }
              }, {
                text: values.confirm,
                handler: () => {
                  this.util.logOut();
                }
              }
            ]
          });
          await alert.present();
        }
    );
  }

}

import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {Util} from '../../providers/util';
import {Router, RouterEvent} from '@angular/router';
import {AllEmiterService} from '../services/all-emiter-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  tittle = '';
  public selectedPath = '';
  constructor(
      private allEmiterService: AllEmiterService,
      public translate: TranslateService,
      public alertController: AlertController,
      public util: Util,
      private router: Router
  ) {
    if (this.allEmiterService.subsTitleChange === undefined) {
      this.allEmiterService.subsTitleChange = this.allEmiterService.invoketTitleChange.subscribe((data) => {
        this.tittle = data;
      });
    }
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        // this.selectedPath = event.url;
      }
    });
  }

  async logOut() {
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
                handler: () => {
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

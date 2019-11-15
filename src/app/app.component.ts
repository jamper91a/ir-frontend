import {Component} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Util} from '../providers/util';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: Util,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const self = this;
    this.platform.ready().then(() => {
      self.translate.setDefaultLang('es');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}

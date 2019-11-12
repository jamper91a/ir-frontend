import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Util} from '../providers/util';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
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
    private translate: TranslateService,
    private router: Router
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

    if ( this.util.getPreference('token')) {
      this.router.navigateByUrl('/home');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LoginRequest} from '../../webServices/request/LoginRequest';
import {InventarioReal} from '../../providers/inventarioReal';
import {LoginResponse} from '../../webServices/response/LoginResponse';
import {Util} from '../../providers/util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private request: LoginRequest = new LoginRequest();
  private loginErrorString: string;
  constructor(
      private translate: TranslateService,
      private inventarioReal: InventarioReal,
      private util: Util,
      private router: Router
  ) {
    this.translate.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

  }

  ngOnInit() {
  }

  async doLogin() {
    try {
      await this.inventarioReal.login(this.request);
      this.router.navigateByUrl('/home');
    } catch (e) {
      console.error(e);
    }
  }

}

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

  public request: LoginRequest = new LoginRequest();
  public loginErrorString: string;
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
      let redirectUrl = '';
      const response: LoginResponse  = await this.inventarioReal.login(this.request);
      switch (response.data.user.group.id) {
        case 1:
          redirectUrl = 'superAdmin';
          break
        case 2:
          redirectUrl = 'admin';
          break;
        case 5:
          redirectUrl = 'dealer';
          break;
      }
      this.router.navigateByUrl(redirectUrl);
    } catch (e) {
      console.error(e);
    }
  }

}

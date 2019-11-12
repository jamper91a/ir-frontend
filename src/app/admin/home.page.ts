import { Component } from '@angular/core';
import {InventarioReal} from '../../providers/inventarioReal';
import {TranslateService} from '@ngx-translate/core';
import {Employee} from '../../pojo/Employee';
import {Util} from '../../providers/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private inventarioReal: InventarioReal,
      private translate: TranslateService,
      private util: Util
  ) {
    console.log('homepage');
  }

  private getUserType() {
    const employee: Employee = JSON.parse(this.util.getPreference('employee'));
    return employee.user.group.id;
  }

}

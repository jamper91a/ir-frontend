import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../pojo/Company';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {NavController, Platform} from '@ionic/angular';
import {Util} from '../../../../providers/util';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../../../pojo/Employee';
import {UpdateEmployeeRequest} from '../../../../webServices/request/UpdateEmployeeRequest';
import {AllEmiterService} from '../../../services/all-emiter-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
  public company: Company;
  public employee: Employee;
  public request: UpdateEmployeeRequest = new UpdateEmployeeRequest();
  constructor(
      private inventarioReal: InventarioReal,
      public platform: Platform,
      public util: Util,
      private navCtrl: NavController,
      private allEmiterService: AllEmiterService,
      private route: ActivatedRoute,
      private router: Router,
  ) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.employee = this.router.getCurrentNavigation().extras.state.employee;
        this.request.putData(this.employee);
        this.allEmiterService.onNewTitle(this.employee.user.name);
      }
    });
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    if (!this.employee) {
      this.navCtrl.navigateBack(['admin/users' ]);
    }
  }

  async doUpdate() {
    try {
      this.request.validate();
      await this.inventarioReal.updateEmployee(this.request);
      this.util.showToast('employee_updated');
      this.navCtrl.navigateBack(['admin/users' ]);
    } catch (e) {
      // console.log(e.toString());
      // console.log(e.name);
      this.util.showToast(e.toString());
    }
  }

}

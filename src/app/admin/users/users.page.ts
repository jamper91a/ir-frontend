import { Component, OnInit } from '@angular/core';
import {Company} from '../../../pojo/Company';
import {Shop} from '../../../pojo/Shop';
import {InventarioReal} from '../../../providers/inventarioReal';
import {Events, NavController, Platform} from '@ionic/angular';
import {Util} from '../../../providers/util';
import {GetShopsByCompanyResponse} from '../../../webServices/response/GetShopsByCompanyResponse';
import {NavigationExtras} from '@angular/router';
import {CreateEmployeeRequest} from '../../../webServices/request/CreateEmployeeRequest';
import {Employee} from '../../../pojo/Employee';
import {GetEmployeesByCompanyResponse} from '../../../webServices/response/GetEmployeesByCompanyResponse';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  public company: Company;
  public request: CreateEmployeeRequest;
  public employees: Employee[];
  public allEmployees: Employee[];
  public shops: Shop[];
  constructor(private inventarioReal: InventarioReal,
              public platform: Platform,
              public util: Util,
              private navCtrl: NavController,
              public events: Events) {
    this.request = new CreateEmployeeRequest();
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    const dialog = await this.util.showDialog('');
    this.inventarioReal.showDialog = false;
    await this.getCompany();
    await this.getShops();
    await this.getEmployees();
    this.inventarioReal.showDialog = true;
    await dialog.dismiss();
  }
  async getCompany() {
    this.platform.ready().then(async () => {
      const response = await this.inventarioReal.getCompanyById();
      this.company = response.data;
      this.request.employee.company = this.company.id;
      this.events.publish('tittle', this.company.name);
    });
  }
  async doCreate() {
    try {
      this.request.validate();
      await this.inventarioReal.createEmployee(this.request);
      this.util.showToast('employee_created');
      this.getShops();
    } catch (e) {
      // console.log(e.toString());
      // console.log(e.name);
      this.util.showToast(e.toString());
    }
  }

  async getShops() {
    try {
      const response: GetShopsByCompanyResponse = await this.inventarioReal.getShopsByCompany();
      this.shops = response.data;
    } catch (e) {
      this.util.showToast(e);
    }
  }
  async getEmployees() {
    try {
      const response: GetEmployeesByCompanyResponse = await this.inventarioReal.getEmployeesByCompany();
      this.employees = response.data;
      this.allEmployees = response.data;
    } catch (e) {
      this.util.showToast(e);
    }
  }

  filterItems(ev: CustomEvent) {
    const val = ev.detail.value;

    if (val && val.trim() !== '') {
      this.employees = this.allEmployees.filter((employee: Employee) => {
        return (
            employee.user.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1);
      });
    } else {
      this.allEmployees = this.employees;
    }
  }
  goToEmployee(employee: Employee) {
    const navigationExtras: NavigationExtras = {
      state: {
        employee
      }
    };
    this.navCtrl.navigateForward(['admin/users/edit/' + employee.id], navigationExtras);
  }

}

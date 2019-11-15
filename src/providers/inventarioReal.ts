import { Injectable } from '@angular/core';
import { Api } from './api';
import { Util } from './util';
import {TranslateService} from '@ngx-translate/core';
import {AlertController} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {LoginRequest} from '../webServices/request/LoginRequest';
import {LoginResponse} from '../webServices/response/LoginResponse';
import {AllDealersResponse} from '../webServices/response/AllDealersResponse';
import {CreateDealerRequest} from '../webServices/request/CreateDealerRequest';
import {UpdateDealerRequest} from '../webServices/request/UpdateDealerRequest';
import {AllDealersRequest} from '../webServices/request/AllDealersRequest';



@Injectable()
export class InventarioReal {


  private messages: any;
  constructor(
    private api: Api,
    private util: Util,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    public platform: Platform
  ) {

    this.get_translation();




  }

    public get_translation() {
      const self = this;
      if (!this.messages) {
          this.platform.ready().then(() => {
            self.translate.get(
              [
                'consulting',
                'creating',
                'updating'
              ]
            ).subscribe(
              (values) => {
                  console.log(values);
                  self.messages = values;
              });
          });
        } else {
        }
    }


    public async login(request: LoginRequest): Promise<LoginResponse> {
      this.get_translation();
      const self = this;
      console.log(this.messages);
      const dialog = await this.util.showDialog(this.messages.consulting);
      try {
      // @ts-ignore
        const response: LoginResponse = await this.api.post('loginWeb', request.getBody()).toPromise();
        await dialog.dismiss();
        if (response) {
          this.util.savePreference('token', response.data.token);
          this.util.savePreference('employee', JSON.stringify(response.data.employee));
          this.util.savePreference('user', JSON.stringify(response.data.user));
          this.util.savePreference('dealer', JSON.stringify(response.data.dealer));
      }
      // @ts-ignore
        return response;
      } catch (e) {
        console.log('catch');
        await dialog.dismiss();
        self.util.showToast('error_login');
        throw e;
      }
  }

    public async allDealers(justActiveDealers: boolean = false): Promise<AllDealersResponse> {
      this.get_translation();
      const request: AllDealersRequest = new AllDealersRequest();
      request.justActiveDealers = justActiveDealers;
      const self = this;
      console.log(this.messages);
      const dialog = await this.util.showDialog(this.messages.consulting);
      try {
            // @ts-ignore
            const response: AllDealersResponse = await this.api.post('dealers/getAllDealers', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createDealer(request: CreateDealerRequest): Promise<any> {
        this.get_translation();
        const self = this;
        console.log(this.messages);
        const dialog = await this.util.showDialog(this.messages.creating);
        try {
            // @ts-ignore
            const response: any = await this.api.post('dealers/create', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async updateDealer(request: UpdateDealerRequest): Promise<any> {
        this.get_translation();
        const self = this;
        console.log(this.messages);
        const dialog = await this.util.showDialog(this.messages.updating);
        try {
            // @ts-ignore
            const response: any = await this.api.post('dealers/update', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

    public async changeUserState(request: UpdateDealerRequest): Promise<any> {
        this.get_translation();
        const self = this;
        console.log(this.messages);
        const dialog = await this.util.showDialog(this.messages.updating);
        try {
            // @ts-ignore
            const response: any = await this.api.post('dealers/update', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

}

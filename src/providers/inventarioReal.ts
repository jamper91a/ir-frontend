import { Injectable } from '@angular/core';
import { Api } from './api';
import { Util } from './util';
import {TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import {LoginRequest} from '../webServices/request/LoginRequest';
import {LoginResponse} from '../webServices/response/LoginResponse';
import {AllDealersResponse} from '../webServices/response/AllDealersResponse';
import {CreateDealerRequest} from '../webServices/request/CreateDealerRequest';
import {UpdateDealerRequest} from '../webServices/request/UpdateDealerRequest';
import {AllDealersRequest} from '../webServices/request/AllDealersRequest';
import {CreateAdminRequest} from '../webServices/request/CreateAdminRequest';
import {GetAllCompaniesByDealerResponse} from '../webServices/response/GetAllCompaniesByDealerResponse';
import {GetAllCompaniesByDealerRequest} from '../webServices/request/GetAllCompaniesByDealerRequest';
import {UpdateAdminRequest} from '../webServices/request/UpdateAdminRequest';
import {GetByIdRequest} from '../webServices/request/GetByIdRequest';
import {GetCompanyByIdResponse} from '../webServices/response/GetCompanyByIdResponse';
import {CreateEpcsRequest} from '../webServices/request/CreateEpcsRequest';
import {TagsByDealerByMonthResponse} from '../webServices/response/TagsByDealerByMonthResponse';
import {UpdateCompanyRequest} from '../webServices/request/UpdateCompanyRequest';
import {CreateShopRequest} from '../webServices/request/CreateShopRequest';
import {GetShopsByCompanyResponse} from '../webServices/response/GetShopsByCompanyResponse';
import {UpdateShopRequest} from '../webServices/request/UpdateShopRequest';
import {GetZonesByShopResponse} from '../webServices/response/GetZonesByShopResponse';
import {CreateZoneRequest} from '../webServices/request/CreateZoneRequest';
import {UpdateZoneRequest} from '../webServices/request/UpdateZoneRequest';



@Injectable()
export class InventarioReal {


  private messages: any;
  public showDialog = true;
  constructor(
    private api: Api,
    private util: Util,
    private translate: TranslateService,
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
      const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
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
      const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
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

    public async createAdmin(request: CreateAdminRequest): Promise<any> {
        this.get_translation();
        const self = this;
        console.log(this.messages);
        const dialog = await this.util.showDialog(this.messages.creating);
        try {
            // @ts-ignore
            const response: any = await this.api.post('createAdmin', request.getBody()).toPromise();
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

    public async getAllCompaniesByDealer(justActive: boolean = false): Promise<GetAllCompaniesByDealerResponse> {
        this.get_translation();
        const request: GetAllCompaniesByDealerRequest = new GetAllCompaniesByDealerRequest();
        request.justActive = justActive;
        const self = this;
        console.log(this.messages);
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetAllCompaniesByDealerResponse = await this.api.post(
                'companies/getCompaniesByDealer',
                request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async updateAdmin(request: UpdateAdminRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.updating);
        try {
            // @ts-ignore
            const response: any = await this.api.post('updateAdmin', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

    public async getCompanyById(id: string = ''): Promise<GetCompanyByIdResponse> {
        this.get_translation();
        const request: GetByIdRequest = new GetByIdRequest();
        request.id = id;
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetCompanyByIdResponse = await this.api.post('companies/getCompaniesById', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createEpc(request: CreateEpcsRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating);
        try {
            // @ts-ignore
            const response: any = await this.api.post('epcs/create', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async tagsByDealerByMonth(): Promise<TagsByDealerByMonthResponse> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: TagsByDealerByMonthResponse = await this.api.post('epcs/tagsByDealerByMonth', {}).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async tagsByCompanyByMonth(companyId: string): Promise<TagsByDealerByMonthResponse> {
        this.get_translation();
        const request: GetByIdRequest = new GetByIdRequest();
        request.id = companyId;
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: TagsByDealerByMonthResponse = await this.api.post('epcs/tagsByCompanyByMonth', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            console.log('catch');
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async updateCompany(request: UpdateCompanyRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: TagsByDealerByMonthResponse = await this.api.postWithFiles('companies/update', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createShop(request: CreateShopRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('shops', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }

    public async getShopsByCompany(): Promise<GetShopsByCompanyResponse> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetShopsByCompanyResponse = await this.api.get('shops', {}).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async updateShop(request: UpdateShopRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.updating, this.showDialog);
        try {
            // @ts-ignore
            await this.api.patch('shops/' + request.id, request.getBody()).toPromise();
            await dialog.dismiss();
            return;
        } catch (e) {
            console.error(e);
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

    public async getZonesByShop(id: string): Promise<GetZonesByShopResponse> {
        this.get_translation();
        const request: GetByIdRequest = new GetByIdRequest();
        request.id = id;
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetZonesByShopResponse = await this.api.post('zones/find', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createZone(request: CreateZoneRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('zones', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }

    public async updateZone(request: UpdateZoneRequest): Promise<any> {
        this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.updating, this.showDialog);
        try {
            // @ts-ignore
            await this.api.patch('zones/' + request.id, request.getBody()).toPromise();
            await dialog.dismiss();
            return;
        } catch (e) {
            console.error(e);
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

}

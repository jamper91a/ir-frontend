import {Injectable} from '@angular/core';
import {Api} from './api';
import {Util} from './util';
import {TranslateService} from '@ngx-translate/core';
import {Platform} from '@ionic/angular';
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
import {GetEmployeesByCompanyResponse} from '../webServices/response/GetEmployeesByCompanyResponse';
import {CreateEmployeeRequest} from '../webServices/request/CreateEmployeeRequest';
import {UpdateEmployeeRequest} from '../webServices/request/UpdateEmployeeRequest';
import {CreateProductRequest} from '../webServices/request/CreateProductRequest';
import {CreateSupplierRequest} from '../webServices/request/CreateSupplierRequest';
import {GetSuppliersByCompanyResponse} from '../webServices/response/GetSuppliersByCompanyResponse';
import {UpdateSupplierRequest} from '../webServices/request/UpdateSupplierRequest';
import {CreateProductsRequest} from '../webServices/request/CreateProductsRequest';
import {UpdateProductRequest} from '../webServices/request/UpdateProductRequest';
import {GetProductsResponse} from '../webServices/response/GetProductsResponse';
import {GetLastConsolidatedInventory} from '../webServices/response/GetLastConsolidatedInventory';
import {CreatePdfRequest} from '../webServices/request/CreatePdfRequest';
import {CreatePdfResponse} from '../webServices/response/CreatePdfResponse';
import {GetProductByEanPluRequest} from '../webServices/request/GetProductByEanPluRequest';
import {GetProductByEanPluResponse} from '../webServices/response/GetProductByEanPluResponse';
import {GetProductInShopByEanPluResponse} from '../webServices/response/getProductInShopByEanPluResponse';
import {GetProductInShopByEanPluRequest} from '../webServices/request/GetProductInShopByEanPluRequest';
import {GetAllConsolidatedInventoriesResponse} from '../webServices/response/GetAllConsolidatedInventoriesResponse';
import {GetDiferenceBetweenInventoriesRequest} from '../webServices/request/GetDiferenceBetweenInventoriesRequest';
import {GetDiferenceBetweenInventoriesResponse} from '../webServices/response/GetDiferenceBetweenInventoriesResponse';
import {GetDiferenceInventoryErpResponse} from '../webServices/response/GetDiferenceInventoryErpResponse';
import {SaleUnitsReportRequest} from '../webServices/request/SaleUnitsReportRequest';
import {GetSoldUnitsResponse} from '../webServices/response/GetSoldUnitsResponse';
import {CreateErpReportRequest} from '../webServices/request/CreateErpReportRequest';



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
      return new Promise(resolve => {
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
                            resolve();
                        });
                });
            } else {
                resolve();
            }
        });

    }


    public async login(request: LoginRequest): Promise<LoginResponse> {
      await this.get_translation();
      const self = this;
      console.log(this.messages);
      const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
      try {
      // @ts-ignore
        const response: LoginResponse = await this.api.post('loginWeb', request.getBody()).toPromise();
        await dialog.dismiss();
        if (response) {
            Util.savePreference('token', response.data.token);
            Util.savePreference('employee', JSON.stringify(response.data.employee));
            Util.savePreference('user', JSON.stringify(response.data.user));
            Util.savePreference('dealer', JSON.stringify(response.data.dealer));
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
      await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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
        await this.get_translation();
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

    public async getEmployeesByCompany(): Promise<GetEmployeesByCompanyResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetEmployeesByCompanyResponse = await this.api.post('users/listEmployeesByCompany', {}).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createEmployee(request: CreateEmployeeRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('users', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }

    public async updateEmployee(request: UpdateEmployeeRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.updating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('users/modifyEmployeeByUsername', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

    public async createProduct(request: CreateProductRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.postWithFiles('products', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }

    public async createProducts(request: CreateProductsRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('products/import', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }

    public async updateProduct(request: UpdateProductRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.updating, this.showDialog);
        try {
            // @ts-ignore
            await this.api.postWithFiles('products/update', request.getBody()).toPromise();
            await dialog.dismiss();
            return;
        } catch (e) {
            console.error(e);
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

    public async getProducts(): Promise<GetProductsResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetProductsResponse = await this.api.get('products', {}).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createSupplier(request: CreateSupplierRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('suppliers', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }

    public async getSuppliers(): Promise<GetSuppliersByCompanyResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetSuppliersByCompanyResponse = await this.api.get('suppliers', {}).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async updateSupplier(request: UpdateSupplierRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.updating, this.showDialog);
        try {
            // @ts-ignore
            await this.api.patch('suppliers/' + request.id, request.getBody()).toPromise();
            await dialog.dismiss();
            return;
        } catch (e) {
            console.error(e);
            await dialog.dismiss();
            self.util.showToast('error_updating_data');
            throw e;
        }
    }

    public async getProductInShopByEanPlu(request: GetProductInShopByEanPluRequest): Promise<GetProductInShopByEanPluResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetProductInShopByEanPluResponse = await this.api.post('productos/findProductInLocalByEanPlu',
                request.getBody()).toPromise();
            await dialog.dismiss();
            if (response.data.length === 0) {
                self.util.showToast('no_data');
            }
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async getAllConsolidatedInventories(): Promise<GetAllConsolidatedInventoriesResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetAllConsolidatedInventoriesResponse = await this.api.post('inventariosConsolidados/listarTodos',
                {}).toPromise();
            await dialog.dismiss();
            if (response.data.length === 0) {
                self.util.showToast('no_data');
            }
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async getDiferenceBetweenInventories(request: GetDiferenceBetweenInventoriesRequest):
        Promise<GetDiferenceBetweenInventoriesResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetDiferenceBetweenInventoriesResponse = await this.api.post('reportes/diferenceBetweenInventories',
                request.getBody()).toPromise();
            await dialog.dismiss();
            if (response.data.length === 0) {
                self.util.showToast('no_data');
            }
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async getDiferenceInventoryErp():
        Promise<GetDiferenceInventoryErpResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetDiferenceInventoryErpResponse = await this.api.post('reportes/diferenceWithInventoryErp',
                {}).toPromise();
            await dialog.dismiss();
            if (response.data.length === 0) {
                self.util.showToast('no_data');
            }
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async getSoldUnits(request: SaleUnitsReportRequest):
        Promise<GetSoldUnitsResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetSoldUnitsResponse = await this.api.post('reportes/saleUnits',
                request.getBody()).toPromise();
            await dialog.dismiss();
            if (response.data.saleUnits.length === 0 || response.data.returnedUnits.length === 0) {
                self.util.showToast('no_data');
            }
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    public async createPdf(request: CreatePdfRequest) {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: CreatePdfResponse = await this.api.post('pdf/create', request.getBody()).toPromise();

            // tslint:disable-next-line:only-arrow-functions
            setTimeout(async function() {
                await dialog.dismiss();
                window.open(self.util.url + response.data, '_blank');
            }, 1000);

        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }



    public async getProductByEanPlu(request: GetProductByEanPluRequest): Promise<GetProductByEanPluResponse> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
        try {
            // @ts-ignore
            const response: GetProductByEanPluResponse = await this.api.post('productos/findOne', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_consulting_data');
            throw e;
        }
    }

    // region Reports
    public async getLastConsolidatedInventory(): Promise<GetLastConsolidatedInventory> {
      await this.get_translation();
      const self = this;
      const dialog = await this.util.showDialog(this.messages.consulting, this.showDialog);
      try {
            // @ts-ignore
            const response: GetLastConsolidatedInventory = await this.api.post('inventariosConsolidados/ultimoInventario', {}).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_getting_data');
            throw e;
        }
    }

    // endregion

    public async createErpReport(request: CreateErpReportRequest): Promise<any> {
        await this.get_translation();
        const self = this;
        const dialog = await this.util.showDialog(this.messages.creating, this.showDialog);
        try {
            // @ts-ignore
            const response: any = await this.api.post('inventoryErp/create', request.getBody()).toPromise();
            await dialog.dismiss();
            return response;
        } catch (e) {
            await dialog.dismiss();
            self.util.showToast('error_creating_data');
            throw e;
        }
    }


}

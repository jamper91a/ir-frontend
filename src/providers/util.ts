import {LoadingController, ToastController} from '@ionic/angular';
import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


/**
 * Created by Usuario on 02/06/2017.
 */
@Injectable()
export class Util {
  constructor(
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
  ) {

      this.constants = {
      logged: 'logged',
      tutorial: 'tutorial',
      user: 'user',
      token: 'token',
      latitude: 'latitude',
      longitude: 'longitude',
      type_find_promotio: 'type_find_promotio',
      find_promotio_by_location: 'find_promotio_by_location',
      find_promotion_by_category: 'find_promotion_by_category',
      category_name: 'category_name',
      city_name: 'city_name',
      address: 'address',
      subcategory_id: 'subcategory_id',
      subcategory_name: 'subcategory_name',
      offer_id: 'offer_id',
      branch_id: 'branch_id',
      offers_user: 'offers_user',
      offer: 'offer',
      kind_map: 'kind_map',
      map_offer: 'map_offer',
      map_branch: 'map_branch',
      branch: 'branch',
      company: 'company',
      country_code: 'country_code',
      country_name: 'country_name',
      find_promotion_by_user_id: 'find_promotion_by_user_id',
      find_promotion_by_subcategory_name: 'find_promotion_by_subcategory_name',
      language: 'language',
      push_code: 'push_code',
      topics: 'topics',
      company_name: 'company_name',
      get_location_first_time: 'get_location_first_time',
      logs: 'logs',
      find_business: 'find_business',
      find_exporters: 'find_exporters',
      find_agro: 'find_agro',
      find_touristic: 'find_touristic',
      exporter: 'exporter'
    };
      this.url = 'http://localhost:1337/';
      this.version = '2.7.5';
  }

  public constants;
  public url: string;
  public version: string;




  public savePreference(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  public getPreference(key): any {
    return localStorage.getItem(key);
  }

  public clearAllData() {
    localStorage.clear();
  }

  public showToast(message: string) {
    this.translateService.get(message).subscribe(async (value) => {

        console.log(message);
        console.log(value);
        const toast = await this.toastCtrl.create({
            message: value,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    });

  }

  public async showDialog(msg: string) {
    const loading = await this.loadingCtrl.create({
        message: msg,
        keyboardClose: false
    });
    await loading.present();
    return loading;

  }
  public isUrlValid(userInput: string) {
    if (userInput != null) {
      const res = userInput.match(/http(s)?:\/\/.?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      if (res == null) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

  }

  public setLogs(msn: string) {
    let logs = this.getPreference(this.constants.logs);
    if (logs) {
      logs = logs + '\n' + msn + ';';
    } else {
      logs = msn + ';';
    }
    this.savePreference(this.constants.logs, logs);
  }

  public clearLogs() {
    this.savePreference(this.constants.logs, '');
  }

  public getLogs() {
    return this.getPreference(this.constants.logs);
  }
}

import {LoadingController, ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';
import faker from 'faker';
/**
 * Created by Usuario on 02/06/2017.
 */
@Injectable()
export class Util {
  constructor(
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    public router: Router
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
      this.url = environment.url;
      this.imagenUrl = environment.imagenUrl;
      this.version = '1.0.0';
  }

  public constants;
  public url: string;
  public imagenUrl: string;
  public version: string;


    public static savePreference(key: string, value: any) {
    localStorage.setItem(key, value);
  }

    public static getPreference(key): any {
    return localStorage.getItem(key);
  }

    public static clearAllData() {
    localStorage.clear();
  }

  public showToast(message: string) {
    this.translateService.get(message).subscribe(async (value) => {

        const toast = await this.toastCtrl.create({
            message: value,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
        return toast;
    });

  }

  public async showDialog(msg: string, showDialog = true): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
        message: msg,
        keyboardClose: false
    });
    if (showDialog) {
        await loading.present();
    }
    return loading;

  }

  public setLogs(msn: string) {
      let logs = Util.getPreference(this.constants.logs);
      logs = logs ? logs + '\n' + msn + ';' : msn + ';';
      Util.savePreference(this.constants.logs, logs);
  }

  public clearLogs() {
      Util.savePreference(this.constants.logs, '');
  }

  public getLogs() {
      return Util.getPreference(this.constants.logs);
  }

  public logOut() {
      Util.clearAllData();
      this.router.navigateByUrl('/');
  }

  public generateName() {
    return  faker.name.firstName();
  }
  public generateEmail() {
      const email = faker.internet.email();
      console.log(email);
      return  email;
  }
  public generatePassword() {
        return '12345';
  }
  public generateUuid() {
        return faker.random.uuid();
  }
  public generateColor() {
        return faker.commerce.color();
  }
    public generateText() {
        return faker.lorem.paragraph();
    }
    public generateNumber() {
        return faker.random.number();
    }
    public generateWord() {
        return faker.lorem.word();
    }
}

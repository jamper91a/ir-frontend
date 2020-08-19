import {Component, OnInit} from '@angular/core';
import {UpdateCompanyRequest} from '../../../webServices/request/UpdateCompanyRequest';
import {InventarioReal} from '../../../providers/inventarioReal';
import {Platform} from '@ionic/angular';
import {Company} from '../../../pojo/Company';
import {Util} from '../../../providers/util';
import {AllEmiterService} from '../../services/all-emiter-service';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
  constructor(
      private inventarioReal: InventarioReal,
      private platform: Platform,
      private util: Util,
      private allEmiterService: AllEmiterService,
  ) { }
  public request: UpdateCompanyRequest = new UpdateCompanyRequest();
  public company: Company;

  public imagePath;
  imgURL: any = '/assets/no-preview-available.png';
  public message: string;

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.getCompany();
  }

  handleFileInput(files: FileList) {
    this.request.photo = files[0];
    this.preview(files);
  }

  async doUpdate() {
    try {
      await this.inventarioReal.updateCompany(this.request);
      this.util.showToast('company_updated');
    } catch (e) {
      console.error(e);
    }
  }

  async getCompany() {
    this.platform.ready().then(async () => {
      const response = await this.inventarioReal.getCompanyById();
      this.company = response.data;
      if (this.company && this.company.photo) {
        this.imgURL = this.util.url + '/' + this.company.photo;
      }
      this.request.putData(this.company);
      this.allEmiterService.onNewTitle(this.company.name);
    });
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
    };
  }

}

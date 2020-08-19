import {Component, OnInit} from '@angular/core';
import {InventarioReal} from '../../../../providers/inventarioReal';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {AllEmiterService} from '../../../services/all-emiter-service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.page.html',
  styleUrls: ['./dates.page.scss'],
})
export class DatesPage implements OnInit {

  public monthNames = [];
  public request: {
    initialDate: string,
    finalDate: string,
  } = {
    initialDate: '',
    finalDate: ''
  };
  public data: any;

  constructor(
      private allEmiterService: AllEmiterService,
      private inventarioReal: InventarioReal,
      private router: Router,
      private navCtrl: NavController,
      private route: ActivatedRoute,
      public translateService: TranslateService
  ) {
    this.translateService.get([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]).subscribe(async (values) => {
      this.monthNames.push(values.January);
      this.monthNames.push(values.February);
      this.monthNames.push(values.March);
      this.monthNames.push(values.April);
      this.monthNames.push(values.May);
      this.monthNames.push(values.June);
      this.monthNames.push(values.July);
      this.monthNames.push(values.August);
      this.monthNames.push(values.September);
      this.monthNames.push(values.October);
      this.monthNames.push(values.November);
      this.monthNames.push(values.December);

    });

    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
        console.log(this.data);
        if (!this.data || !this.data.goTo) {
          this.navCtrl.navigateBack('admin/reports');
        }
        this.allEmiterService.onNewTitle(this.data.title);
      } else {
        this.navCtrl.navigateBack('admin/reports');
      }
    });
  }

  ngOnInit() {
  }

  goToNextPage() {
    console.log(this.request);
    const navigationExtras: NavigationExtras = {
      state: {
        request: this.request
      }
    };
    this.navCtrl.navigateForward([this.data.goTo], navigationExtras);

  }

  formatInitialDate(date) {
    date = date.split('T')[0];
    this.request.initialDate = date;
  }

  formatFinalDate(date) {
    date = date.split('T')[0];
    this.request.finalDate = date;
  }

}

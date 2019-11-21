import { Component, OnInit } from '@angular/core';
import {AllEmiterService} from '../../../../services/all-emiter-service';

@Component({
  selector: 'app-rotationprojected',
  templateUrl: './rotationprojected.page.html',
  styleUrls: ['./rotationprojected.page.scss'],
})
export class RotationprojectedPage implements OnInit {

  constructor(
      private allEmiterService: AllEmiterService,
  ) {
    this.allEmiterService.onNewTitle('rotation_projected');
  }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    this.allEmiterService.onNewTitle('rotation_projected');
  }

}

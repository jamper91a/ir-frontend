import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DealersPage } from './dealers.page';
import {TranslateModule} from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: DealersPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild()
  ],
  declarations: [DealersPage]
})
export class DealersPageModule {}

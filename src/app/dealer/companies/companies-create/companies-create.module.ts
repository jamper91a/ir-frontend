import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import {TranslateModule} from '@ngx-translate/core';
import {CompaniesCreatePage} from './companies-create.page';

const routes: Routes = [
  {
    path: '',
    component: CompaniesCreatePage
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
  declarations: [CompaniesCreatePage]
})
export class CompaniesCreatePageModule {}

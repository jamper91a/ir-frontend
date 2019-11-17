import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', loadChildren: '../companies/companies-create/companies-create.module#CompaniesCreatePageModule' },
      { path: 'companies/create', loadChildren: '../companies/companies-create/companies-create.module#CompaniesCreatePageModule' },
      { path: 'companies/list', loadChildren: '../companies/companies-list/companies-list.module#CompaniesListPageModule' },
      { path: 'companies/details/:id', loadChildren: '../companies/companies-details/companies-details.module#CompaniesDetailsPageModule' },
      { path: 'tags/create/step-1', loadChildren: '../tags/tags-create/tags-create.module#TagsCreatePageModule' },
      {
        path: 'tags/create/step-2/:id',
        loadChildren: '../tags/tags-create-step-two/tags-create-step-two.module#TagsCreateStepTwoPageModule'
      },
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsPageModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

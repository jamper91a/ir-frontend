import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'a',
    component: HomePage,
    children: [
      { path: 'clients/create', loadChildren: '../clients/clients-create/clients-create.module#ClientsCreatePageModule' },
      // { path: 'dealers/details/:id', loadChildren: './dealers/dealers-detail/dealers-detail.module#DealersDetailPageModule' },
      // { path: 'dealers/list', loadChildren: './dealers/dealers-list/dealers-list.module#DealersListPageModule' }
    ]
  },
  {
    path: '',
    redirectTo: '/dealer/a/clients/create',
    pathMatch: 'full'
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

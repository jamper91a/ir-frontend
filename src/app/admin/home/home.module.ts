import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'b',
    component: HomePage,
    children: [
      // { path: 'dealers/create', loadChildren: './dealers/dealers-create/dealers.module#DealersPageModule' },
      // { path: 'dealers/details/:id', loadChildren: './dealers/dealers-detail/dealers-detail.module#DealersDetailPageModule' },
      // { path: 'dealers/list', loadChildren: './dealers/dealers-list/dealers-list.module#DealersListPageModule' }
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

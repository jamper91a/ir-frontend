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
      { path: '', loadChildren: './company/company.module#CompanyPageModule' },
      { path: 'company', loadChildren: './company/company.module#CompanyPageModule' },
      { path: 'products', loadChildren: './products/products.module#ProductsPageModule' },
      { path: 'products/create', loadChildren: './products/product-create/product-create.module#ProductCreatePageModule' },
      { path: 'products/import', loadChildren: './products/products-import/products-import.module#ProductsImportPageModule' },
      { path: 'shops', loadChildren: './shops/shops.module#ShopsPageModule' },
      { path: 'shops/edit/:id', loadChildren: './shops/edit-shop/edit-shop.module#EditShopPageModule' },
      { path: 'suppliers', loadChildren: './suppliers/suppliers.module#SuppliersPageModule' },
      { path: 'suppliers/create', loadChildren: './suppliers/supplier-create/supplier-create.module#SupplierCreatePageModule' },
      { path: 'suppliers/edit/:id', loadChildren: './suppliers/edit-supplier/edit-supplier.module#EditSupplierPageModule' },
      { path: 'users', loadChildren: './users/users.module#UsersPageModule' },
      { path: 'users/edit/:id', loadChildren: './users/edit-user/edit-user.module#EditUserPageModule' },
      { path: 'zones', loadChildren: './zones/zones.module#ZonesPageModule' },
      { path: 'zones/create/:id', loadChildren: './zones/create-zone/create-zone.module#CreateZonePageModule' },
      { path: 'zones/edit/:id', loadChildren: './zones/edit-zone/edit-zone.module#EditZonePageModule' }
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

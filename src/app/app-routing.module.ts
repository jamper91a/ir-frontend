/* tslint:disable:max-line-length */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SuperAdminGuard} from '../guards/superAdmin.guard';
import {AdminGuard} from '../guards/admin.guard';
import {DealerGuard} from '../guards/dealer.guard';
import {AuthGuard} from '../guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'superAdmin',
    loadChildren: './superAdmin/home.module#HomePageModule',
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/home.module#HomePageModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'dealer',
    canActivate: [DealerGuard],
    loadChildren: './dealer/home/home.module#HomePageModule'
  },

    // SuperAdmin
  { path: 'superAdmin/dealers/create', loadChildren: './superAdmin/dealers/dealers-create/dealers.module#DealersPageModule' },
  { path: 'superAdmin/dealers/details/:id', loadChildren: './superAdmin/dealers/dealers-detail/dealers-detail.module#DealersDetailPageModule' },
  { path: 'superAdmin/dealers/list', loadChildren: './superAdmin/dealers/dealers-list/dealers-list.module#DealersListPageModule' },
    // Admin
  { path: 'admin/company', loadChildren: './admin/company/company.module#CompanyPageModule' },
  { path: 'admin/erp', loadChildren: './admin/erp/erp.module#ErpPageModule' },
  { path: 'admin/products', loadChildren: './admin/products/products.module#ProductsPageModule' },
  { path: 'admin/products/create', loadChildren: './admin/products/product-create/product-create.module#ProductCreatePageModule' },
  { path: 'admin/products/import', loadChildren: './admin/products/products-import/products-import.module#ProductsImportPageModule' },
  { path: 'admin/shops', loadChildren: './admin/shops/shops.module#ShopsPageModule' },
  { path: 'admin/shops/edit/:id', loadChildren: './admin/shops/edit-shop/edit-shop.module#EditShopPageModule' },
  { path: 'admin/suppliers', loadChildren: './admin/suppliers/suppliers.module#SuppliersPageModule' },
  { path: 'admin/suppliers/create', loadChildren: './admin/suppliers/supplier-create/supplier-create.module#SupplierCreatePageModule' },
  { path: 'admin/suppliers/edit/:id', loadChildren: './admin/suppliers/edit-supplier/edit-supplier.module#EditSupplierPageModule' },
  { path: 'admin/users', loadChildren: './admin/users/users.module#UsersPageModule' },
  { path: 'admin/users/edit/:id', loadChildren: './admin/users/edit-user/edit-user.module#EditUserPageModule' },
  { path: 'admin/zones', loadChildren: './admin/zones/zones.module#ZonesPageModule' },
  { path: 'admin/zones/create/:id', loadChildren: './admin/zones/create-zone/create-zone.module#CreateZonePageModule' },
  { path: 'admin/zones/edit/:id', loadChildren: './admin/zones/edit-zone/edit-zone.module#EditZonePageModule' },
    // Dealer
  { path: 'dealer/companies/create', loadChildren: './dealer/companies/companies-create/companies-create.module#CompaniesCreatePageModule' },
  { path: 'dealer/companies/list', loadChildren: './dealer/companies/companies-list/companies-list.module#CompaniesListPageModule' },
  { path: 'dealer/companies/details/:id', loadChildren: './dealer/companies/companies-details/companies-details.module#CompaniesDetailsPageModule' },
  { path: 'dealer/tags/create/step-1', loadChildren: './dealer/tags/tags-create/tags-create.module#TagsCreatePageModule' },
  { path: 'dealer/tags/create/step-2/:id', loadChildren: './dealer/tags/tags-create-step-two/tags-create-step-two.module#TagsCreateStepTwoPageModule' },
  { path: 'dealer/reports', loadChildren: './dealer/reports/reports.module#ReportsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

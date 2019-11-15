import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SuperAdminGuard} from '../guards/superAdmin.guard';
import {AdminGuard} from '../guards/admin.guard';
import {DealerGuard} from '../guards/dealer.guard';
import {AuthGuard} from '../guards/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'superAdmin',
    loadChildren: './superAdmin/home.module#HomePageModule',
    // children: [
    //   { path: '', loadChildren: './superAdmin/home.module#HomePageModule' },
    //   { path: 'dealers/create', loadChildren: './superAdmin/dealers/dealers-create/dealers.module#DealersPageModule' },
    //   { path: 'dealers/details/:id', loadChildren: './superAdmin/dealers/dealers-detail/dealers-detail.module#DealersDetailPageModule' },
    //   { path: 'dealers/list', loadChildren: './superAdmin/dealers/dealers-list/dealers-list.module#DealersListPageModule' }
    // ],
    canActivate: [SuperAdminGuard]
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/home/home.module#HomePageModule',
    canActivate: [AdminGuard]
  },
  {
    path: 'dealer',
    canActivate: [DealerGuard],
    loadChildren: './dealer/home/home.module#HomePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

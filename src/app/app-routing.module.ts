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
  { path: 'zones', loadChildren: './admin/zones/zones.module#ZonesPageModule' },
  { path: 'create-zone', loadChildren: './admin/zones/create-zone/create-zone.module#CreateZonePageModule' },
  { path: 'edit-zone', loadChildren: './admin/zones/edit-zone/edit-zone.module#EditZonePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SuperAdminGuard} from '../guards/superAdmin.guard';
import {AdminGuard} from '../guards/admin.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'superAdmin', loadChildren: './superAdmin/home.module#HomePageModule', canActivate: [SuperAdminGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'},
  { path: 'admin', loadChildren: './admin/home/home.module#HomePageModule', canActivate: [AdminGuard]},
  { path: 'dealer', loadChildren: './dealer/home/home.module#HomePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

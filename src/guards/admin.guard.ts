import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Util} from '../providers/util';
import {User} from '../pojo/User';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
      private util: Util,
      private router: Router,
  ) {

  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const data = this.util.getPreference('user');
    if (data) {
      const user: User = JSON.parse(data);
      return user.group.id === 2;
    }
    this.router.navigateByUrl('/');

  }
}

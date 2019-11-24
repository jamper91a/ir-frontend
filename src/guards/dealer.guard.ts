import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Util} from '../providers/util';
import {User} from '../pojo/User';

@Injectable({
  providedIn: 'root'
})
export class DealerGuard implements CanActivate {
  constructor(
      private util: Util,
      private router: Router,
  ) {

  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const data = Util.getPreference('user');
    if (data) {
      const user: User = JSON.parse(data);
      return user.group.id === 5;
    }
    this.router.navigateByUrl('/');
  }
}

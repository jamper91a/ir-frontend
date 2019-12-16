import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Util} from '../providers/util';
import {User} from '../pojo/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private util: Util,
      private router: Router,
  ) {

  }

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const data = Util.getPreference('user');
    console.log(data);
    if (data) {
      const user: User = JSON.parse(data);
      console.log(user.group.id);
      switch (user.group.id) {
        case 1:
          return this.router.navigateByUrl('/superAdmin');
        case 2:
          return this.router.navigateByUrl('/admin');
        case 5:
          return this.router.navigateByUrl('/dealer');
      }
    }
    return true;

  }
}

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.authService
        .currentUser()
        .then(res => {
          return resolve(true);
        }, err => {
          this.router.navigate(['auth/login']);
          return resolve(false);
        });
    });
  }
}

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()

export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.authService
        .currentUser()
        .then(res => {
          this.authService.logout();
          return resolve(true);
        }, err => {
          return resolve(true);
        });
    });
  }
}

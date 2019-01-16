import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthGuard implements CanActivate {

  tokenHelper = new JwtHelperService();
  
  constructor(
    private router: Router) { }

  canActivate() {

    const token  = localStorage.getItem('access_token');

    if (!token || this.tokenHelper.isTokenExpired(token)) {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}

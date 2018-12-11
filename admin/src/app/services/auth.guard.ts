import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: LoginService, 
    private router: Router) { }

  canActivate() {
    if (!localStorage.getItem('access_token')) {
      console.log('No estás logueado');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}

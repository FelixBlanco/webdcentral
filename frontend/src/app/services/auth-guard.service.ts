import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserTokenService } from './user-token.service';

@Injectable({providedIn: 'root'})
export class DepositoGuard implements CanActivate {

    constructor(
        private userToken: UserTokenService,
        private router: Router
    ){}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if(this.userToken.isNotLogged()){
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}

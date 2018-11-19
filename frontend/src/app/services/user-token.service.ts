import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData{
    id?: number;
    name: string;
    userName: string;
    api_token?: string;
    email: string;
    fk_idPerfil?: number;
    fotoPerfil?: any;
    tokenFirebase?: string;
    img_perfil?: string;
    //add more
}

@Injectable({providedIn: 'root'})
export class UserTokenService {


    userDataSource: BehaviorSubject<UserData> = new BehaviorSubject(null);
    userData: Observable<UserData> = this.userDataSource.asObservable();

    tokenSourceBehavior: BehaviorSubject<string> = new BehaviorSubject(null);
    token: Observable<string> = this.tokenSourceBehavior.asObservable();


    constructor(){
        if(!this.getUserToken()){
            this.tokenSourceBehavior.next(localStorage.getItem('access_token'));
        }

        if(!this.getUserData()){
            this.userDataSource.next(JSON.parse(localStorage.getItem('user_data')));
        }
    }

    getUserToken(): string{
        return this.tokenSourceBehavior.getValue();
    }

    getUserData(): UserData{
        return this.userDataSource.getValue();
    }

    updateUserData(user: UserData): void{
        this.userDataSource.next(user);
    }

    getUserId(): number{
        return this.userDataSource.getValue().id;
    }

    updateUserToken(token: string): void{
        this.tokenSourceBehavior.next(token);
    }

    /**
     * Elimina todo de la sesión
     */
    clear(): void{
        localStorage.clear();
        this.userDataSource.next(null);
        this.tokenSourceBehavior.next(null);
    }

    isNotLogged(): boolean{
        return (!this.getUserData() && !this.getUserToken());
    }


}
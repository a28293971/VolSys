import { Injectable, OnInit } from '@angular/core';
// import { LoginService } from '../login/login.service';

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public isAdmin: boolean = false;

    // constructor(private loginService:LoginService) {}

    // OnInit(){
        // this.loginService.currentUser.subscribe(()=>{
        //     this.isLoggedIn=true;
        // }
        // )
    // }

    // isLoggedIn(): boolean {
    //     if(localStorage.getItem('currentUser')) return true;
    //     else return false;
    // }
}

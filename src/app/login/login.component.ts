import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
// import * as CryptoJS  from 'crypto-js';

import { User } from '../models/user-model';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public user: User = new User();
    public rMsg: number = 0;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public loginService: LoginService
    ) {
        // console.log(this.loginService);
    }

    ngOnInit() {
        this.loginService.rMsg.
        subscribe(
            data => {
                console.log(data);
                if (data === 1) {
                    this.rMsg = 1;
                }else {
                    this.rMsg = 2;
                    this.user.password = "";
                }
            },
            error => console.log(error)
        );
        // console.log('encr => ' + CryptoJS.MD5('aaaaaaaa'));
        // const key = 'abc';
        // const fuck1 = CryptoJS.AES.encrypt('fuck you!',key);
        // console.log('encr   >' + fuck1);
        // const fuck2 = CryptoJS.AES.decrypt(fuck1.toString(),key);
        // console.log('decr   >' + fuck2.toString(CryptoJS.enc.Utf8));
    }

    login() {
        this.loginService.login(this.user);
    }
    forgetPwd() {

    }
}

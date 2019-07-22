import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';
import { AuthGuard } from './auth/auth.guard';
import { User } from './models/user-model';
import { CurrentUser } from './common/services/currentUser.data';
import { Subscription } from 'rxjs';
import { AppService } from './app.service';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private globalClickCallbackFn: Function;
    // private loginSuccessCallbackFn: Function;
    public currentUser: User;
    private currentUser$: Subscription

    constructor(
        private http: Http,
        // private router: Router,
        // private activatedRoute: ActivatedRoute,
        // private loginService: LoginService,
        // private authGuard: AuthGuard,
        // private CUser: CurrentUser,
        private appService: AppService
    ) {

    }

    ngOnInit() {
        const tmp = localStorage.getItem('currentUser')
        if (tmp) {
            this.currentUser = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'fuck').toString(CryptoJS.enc.Utf8));
        }
        if (this.currentUser) {
            const body = JSON.stringify({
                id: this.currentUser.id,
                token: this.currentUser.token,
                authType: 0
            });
            this.http.post("/volunteer/login", body,
            {headers: new Headers({'Content-Type': 'application/json'})} )
            .subscribe(
                data => {
                    const value = data.json();
                    if (value.sysinfo.auth === 1) {
                        this.appService.tokenLogin(this.currentUser);
                    }else if (value.sysinfo.auth === 2) {
                        alert('system error, please retry');
                    }else {
                        localStorage.clear();
                    }
                },
                error => console.error(error)
            );

        }
    }

    ngOnDestroy() {
        if (this.globalClickCallbackFn) {
            this.globalClickCallbackFn();
        }
        // this.currentUser$.unsubscribe();
    }
}

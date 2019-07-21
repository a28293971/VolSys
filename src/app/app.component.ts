import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
// import { TranslateService } from 'ng2-translate';
import { LoginService } from './login/login.service';
import { AuthGuard } from './auth/auth.guard';
// import 'rxjs/add/operator/merge';
import { User } from './models/user-model';
import { CurrentUser } from './common/services/currentUser.data';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private globalClickCallbackFn: Function;
    private loginSuccessCallbackFn: Function;
    public currentUser: User;
    private currentUser$: Subscription

    constructor(
        private http: Http,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        // public translate: TranslateService,
        public loginService: LoginService,
        private authGuard: AuthGuard,
        private CUser: CurrentUser
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
            const headers = new Headers({'Content-Type': 'application/json'});
            this.http.post("/volunteer/login", body,
            {headers: new Headers({'Content-Type': 'application/json'})} )
            // this.http.get('mock-data/login-token.json')
            .subscribe(
                data => {
                    const value = data.json();
                    if (value.sysinfo.auth === 1) {
                        this.authGuard.isLoggedIn = true;
                        this.CUser.update();
                        this.router.navigateByUrl('/workspace/welcome');
                    }else if (value.sysinfo.auth === 2) {
                        alert('system error, please retry');
                    }else {
                        localStorage.clear();
                    }
                },
                error => console.error(error)
            );

        }

        this.currentUser$ = this.CUser.currentUser
            // .merge(this.userRegisterService.currentUser)
            .subscribe(
            data => {
                this.currentUser = data;
                // this.currentUser.name = data.name;
                let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
                let routerState: RouterState = this.router.routerState;
                let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;

                // console.log(this.currentUser);
                // console.log(activatedRouteSnapshot);
                // console.log(routerState);
                // console.log(routerStateSnapshot);

                this.authGuard.isLoggedIn = true;
/*                 if (this.currentUser.type) {
                    this.authGuard.isAdmin = true;
                } */
                this.router.navigateByUrl('/workspace/welcome');
                // console.log('--------succees login!-----------');
            },
            error => console.error(error)
            );

        // this.translate.addLangs(['zh', 'en']);
        // this.translate.setDefaultLang('zh');

        // const browserLang = this.translate.getBrowserLang();
        // console.log('app-root初始化成功!');
        // console.log('检测到的浏览器语言>' + browserLang);
        // this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    }

    ngOnDestroy() {
        if (this.globalClickCallbackFn) {
            this.globalClickCallbackFn();
        }
        this.currentUser$.unsubscribe();
    }
}

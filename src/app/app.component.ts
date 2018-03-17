import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';
// import { TranslateService } from 'ng2-translate';
import { LoginService } from './login/login.service';
import { AuthGuard } from './auth/auth.guard';
// import 'rxjs/add/operator/merge';
import { User } from './models/user-model';
import { CurrentUser } from './common/services/currentUser.data';
// import { from } from '_rxjs@5.5.2@rxjs/observable/from';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private globalClickCallbackFn: Function;
    private loginSuccessCallbackFn: Function;
    public currentUser: User;

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
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            const body = JSON.stringify({
                id: this.currentUser.id,
                token: this.currentUser.token,
                authType: 0
            });
            const headers = new Headers({'Content-Type': 'application/json'});
            this.http.post("http://192.168.148.6/login", body,
            {headers: new Headers({'Content-Type': 'application/json'})} )
            // this.http.get('mock-data/login-token.json')
            .subscribe(
                data => {
                    const value = data.json();
                    if (value.sysinfo.auth) {
                        this.authGuard.isLoggedIn = true;
                        if (this.currentUser.isAdmin) {
                            this.authGuard.isAdmin = true;
                        }
                        this.router.navigateByUrl('workspace');
                    }
                },
                error => console.log(error)
            );

        }

        this.loginService.currentUser
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
                if (this.currentUser.type) {
                    this.authGuard.isAdmin = true;
                }
                this.CUser.update();
                this.router.navigateByUrl('workspace');
                console.log('--------succees login!-----------');
            },
            error => console.error(error)
            );

        // this.translate.addLangs(['zh', 'en']);
        // this.translate.setDefaultLang('zh');

        // const browserLang = this.translate.getBrowserLang();
        console.log('app-root初始化成功!');
        // console.log('检测到的浏览器语言>' + browserLang);
        // this.translate.use(browserLang.match(/zh|en/) ? browserLang : 'zh');
    }

    ngOnDestroy() {
        if (this.globalClickCallbackFn) {
            this.globalClickCallbackFn();
        }
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(): boolean {
        if (this.authService.isAdmin) {
            return true; }
        // this.router.navigateByUrl('login');
        return false;
    }

    canLoad(): boolean {
        // let oldUrl = this.router.routerState.snapshot.url;
        // console.log(this.router.routerState.snapshot);
        // console.log('url is' + oldUrl);
        if (this.authService.isLoggedIn) {
            return true; }
        this.router.navigateByUrl('login');
        return false;
    }
}

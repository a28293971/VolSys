import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    public isLoggedIn: boolean = false;
/*     public isAdmin: boolean = false; */

    constructor(
        private router: Router
    ) { }

/*     canActivate(): boolean {
        if (this.isAdmin) {
            return true; }
        this.router.navigateByUrl('login');
        return false;
    } */
    canActivate(): boolean {
        return true;
    }

    canLoad(route: Route): boolean {
        // let oldUrl = this.router.routerState.snapshot.url;
        // console.log(this.router.routerState.snapshot);
        // console.log('url is' + oldUrl);
        if (this.isLoggedIn) {
            return true; }
        this.router.navigateByUrl('login');
        return false;
    }
}

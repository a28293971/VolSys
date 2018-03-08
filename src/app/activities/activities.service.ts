import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/takeWhile';

@Injectable()
export class ActivityService {

    constructor(
        private http: Http,
        private router: Router
    ) {}

    getActivities() {
        let token = JSON.parse(localStorage.getItem('currentUser')).token;
        return this.http.post('http://192.168.148.6/list-all-event', JSON.stringify({token: token}))
        .takeWhile((response: Response) => {
            if (!response.json().sysinfo.auth) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }
}

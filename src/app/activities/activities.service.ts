import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../common/services/currentUser.data';

import { User } from '../models/user-model';
import { Activity } from '../models/activity-model';

@Injectable()
export class ActivityService {

    private currentUser: User

    constructor(
        private http: Http,
        private router: Router,
        private CUser: CurrentUser
    ) {
        this.currentUser = this.CUser.currentUser;
    }

    getActivities(count: Number = 10) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            token: this.currentUser.token,
            listAllEvent: '1',
            eventCount: count.toString()
          });
          const headers = new Headers({'Content-Type': 'application/json'});
        return this.http
        .post('http://192.168.148.6/get-event', body, {headers: headers})
        // .get('mock-data/activities.json')
        .takeWhile((response: Response) => {
            if (!response.json().sysinfo.auth) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }

    joinAct(act: Activity) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            eid: act.id,
            ename: act.name,
            token: this.currentUser.token
          });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post("http://192.168.148.6/join-event", body, {headers: headers})
        .takeWhile((response: Response) => {
            if (!response.json().sysinfo.auth) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }
}

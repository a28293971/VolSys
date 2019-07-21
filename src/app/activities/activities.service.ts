import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../common/services/currentUser.data';

import { User } from '../models/user-model';
import { Activity } from '../models/activity-model';

@Injectable()
export class ActivityService {

    public currentUser: User

    constructor(
        private http: Http,
        private router: Router,
        public CUser: CurrentUser
    ) {
        this.currentUser = this.CUser.user;
        this.CUser.currentUser.subscribe(data => this.currentUser = data);
    }

    getActivities(count: Number = 10) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            token: this.currentUser.token,
            listAllEvent: '1',
            eventCount: count.toString(),
            status: '-1'
          });
          const headers = new Headers({'Content-Type': 'application/json'});
        return this.http
        .post('/volunteer/get-event', body, {headers: headers})
        .takeWhile((response: Response) => {
            if (!response.json().sysinfo.auth) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }

    getUserEvnetList() {
        const body = JSON.stringify({
            id: this.currentUser.id,
            token: this.currentUser.token
          });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http
        .post('/volunteer/get-user-events', body, {headers: headers})
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
            name: this.currentUser.name,
            eid: act.id,
            ename: act.name,
            start: act.start,
            token: this.currentUser.token
          });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post("/volunteer/join-event", body, {headers: headers})
        .takeWhile((response: Response) => {
            if (!response.json().sysinfo.auth) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }

    cancelJoinEvent(act: Activity) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            eid: act.id,
            token: this.currentUser.token
          });
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post("/volunteer/cancel-join-event", body, {headers: headers})
        .takeWhile((response: Response) => {
            if (!response.json().sysinfo.auth) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }

    reportAct(act: Activity) {
        const data = JSON.stringify({
            eid: act.id,
            ename: act.name
        });
        localStorage.setItem('feedbackAct', data);
        this.router.navigateByUrl('workspace/help');
    }

}

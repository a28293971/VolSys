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
/*         return this.http
        .get('mock-data/activities.json') */
        .takeWhile((response: Response) => {
            if (response.json().sysinfo.tokenUpdate) {
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
        // return this.http.get('mock-data/allAccept.json')
        .takeWhile((response: Response) => {
            if (response.json().sysinfo.tokenUpdate) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }

    getHadAplAct0(count: Number = 10) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            token: this.currentUser.token,
            listAllEvent: '0',
            eventCount: count.toString(),
            status: '0'
          });
          const headers = new Headers({'Content-Type': 'application/json'});
        return this.http
        .post('/volunteer/get-event', body, {headers: headers})
/*         return this.http
        .get('mock-data/activities-hadApl.json') */
        .takeWhile((response: Response) => {
            if (response.json().sysinfo.tokenUpdate) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }
    getHadAplAct1(count: Number = 10) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            token: this.currentUser.token,
            listAllEvent: '0',
            eventCount: count.toString(),
            status: '1'
          });
          const headers = new Headers({'Content-Type': 'application/json'});
        return this.http
        .post('/volunteer/get-event', body, {headers: headers})
/*         return this.http
        .get('mock-data/activities-hadApl.json') */
        .takeWhile((response: Response) => {
            if (response.json().sysinfo.tokenUpdate) {
                this.router.navigateByUrl('login');
                return false;
            }
            return true;
        });
    }

    getHadAplAct2(count: Number = 10) {
        const body = JSON.stringify({
            id: this.currentUser.id,
            token: this.currentUser.token,
            listAllEvent: '0',
            eventCount: count.toString(),
            status: '2'
          });
          const headers = new Headers({'Content-Type': 'application/json'});
        return this.http
        .post('/volunteer/get-event', body, {headers: headers})
/*         return this.http
        .get('mock-data/activities-hadApl.json') */
        .takeWhile((response: Response) => {
            if (response.json().sysinfo.tokenUpdate) {
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

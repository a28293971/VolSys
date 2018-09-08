import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';

@Injectable()
export class SelfAppliedService {

  private currentUser: User

  constructor(
    private http: Http,
    private router: Router,
    public CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  getNeedApproveActivities(count: Number = 10) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      listAllEvent: '0',
      status: '0',
      eventCount: count.toString()
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/get-event', body, {headers: headers})
  /*   return this.http
    .get("mock-data/act-waitingApr.json") */
    .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    });
  }

  sendMembers(members: any[]) {
/*     const body = JSON.stringify({
      id: this.currentUser.id,
      eid: this.eInfo.id,
      token: this.currentUser.token,
      members: members
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/approve-event', body, {headers: headers})
    // .get('mock-data/activities.json')
    .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }); */
  }
}

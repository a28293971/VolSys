import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';

@Injectable()
export class OrgActivityService {

  private currentUser: User

  constructor(
    private http: Http,
    private router: Router,
    public CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  getActivities() {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/get-org-created-event', body, {headers: headers})
    .takeWhile((response: Response) => {
        if (!response.json().sysinfo.auth) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    });
  }

  optActivity(act, opt: number) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      eid: act.id,
      oid: act.org_id[0],
      opt: opt
    });
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/opt-org-event', body, {headers: headers})
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
}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';

import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';
import { Activity } from '../../models/activity-model';

@Injectable()
export class ActivityService {

  public eInfo: Activity;
  public currentUser: User;


  constructor(
    private router: Router,
    private http: Http,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

/*   getActivityMembers(id: number) {
    return this.http.get('/mock-data/act-' + id + '.json').map((res: Response) => res.json());
  } */

  aprMembers(members: any[]) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      eid: this.eInfo.id,
      token: this.currentUser.token,
      members: members
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('http://192.168.148.6/approve-event', body, {headers: headers})
    // .get('mock-data/activities.json')
    .takeWhile((response: Response) => {
        if (!response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    });
  }

}

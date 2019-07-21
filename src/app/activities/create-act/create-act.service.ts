import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';


import { Activity } from '../../models/activity-model';
import { User } from '../../models/user-model';
import { CurrentUser } from '../../common/services/currentUser.data';

@Injectable()
export class CreateActService {

  public currentUser: User;

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  create(act: Activity) {
    const body = JSON.stringify({
      id: act.org_id,
      org_id: act.org_id,
      org_name: act.org_name,
      ename: act.name,
      start: act.start,
      end: act.end,
      volunteer_time: act.volunteer_time,
      description: act.description,
      etype: 1,
      token: this.currentUser.token
    });

    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/create-event', body, {headers: headers})
    .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    });
  }

}

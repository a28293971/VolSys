import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router'
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../shared/currentUser.data';

import { User } from '../models/user-model';

@Injectable()
export class ApproveService {

  private currentUser: User

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.currentUser;
  }

  getNeedApproveActivities(count: Number = 10) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      listAllEvent: '0',
      status: '-1',
      eventCount: count.toString()
    });
    const headers = new Headers({'Content-Type': 'application/json'});
  return this.http
  .post('http://192.168.148.6/get-event', body, {headers: headers})
  .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
  });

  }

}

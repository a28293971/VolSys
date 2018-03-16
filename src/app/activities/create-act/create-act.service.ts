import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { concat } from 'rxjs/operators/concat';
import { Route } from '@angular/router/src/config';
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../../shared/currentUser.data';

import { Activity } from '../../models/activity-model';
import { User } from '../../models/user-model';

@Injectable()
export class CreateActService {

  private currentUser: User;

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.currentUser;
  }

  create(act: Activity) {
    const body = JSON.stringify({
      org_id: this.currentUser.id,
      org_name: this.currentUser.name,
      name: act.name,
      start: act.start,
      end: act.end,
      volunteer_time: act.volunteer_time,
      description: act.description,
      type: '1',
      token: this.currentUser.token
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('http://192.168.148.6/create-event', body, {headers: headers})
    // console.log(act);
    // .get('/mock-data/create-event.json')
    .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    }).subscribe(
      data => {
        if (data.json().sysinfo.createEvent) {
          alert("活动创建成功!");
          this.router.navigateByUrl('workspace/act/activities');
        }else {
          alert("活动创建失败 请重试!");
        }
      },
      error => console.log(error)
    );
  }

}

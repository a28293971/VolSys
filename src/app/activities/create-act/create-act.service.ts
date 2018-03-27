import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { concat } from 'rxjs/operators/concat';
import { Route } from '@angular/router/src/config';
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
      etype: '1',
      token: this.currentUser.token
    });
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('http://192.168.148.6/create-event', body, {headers: headers})
    // .get('/mock-data/create-event.json')
    .takeWhile((response: Response) => {
      if (response.json().sysinfo.tokenUpdate) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    }).subscribe(
      data => {
        if (data.json().sysinfo.auth) {
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

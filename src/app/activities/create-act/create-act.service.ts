import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity-model';
import { concat } from 'rxjs/operators/concat';
import { Route } from '@angular/router/src/config';

@Injectable()
export class CreateActService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  create(act: Activity) {
    // console.log('had created new act');
    console.log(act);
    return this.http
    .get('/mock-data/create-event.json')
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

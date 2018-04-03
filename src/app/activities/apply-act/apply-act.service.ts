import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ApplyAct } from '../../models/apply-model';
import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';

@Injectable()
export class ApplyActService {

  public currentUser: User;
  public uploadOk: boolean = false;

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  upload(value: FormData) {
    let headers = new Headers({'Content-Type': undefined});
    return this.http.post("http://192.168.148.6/upload", value);
  }

  apply(act: ApplyAct) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      name: this.currentUser.name,
      college: act.college,
      ename: act.ename,
      start: act.start,
      end: act.end,
      volunteer_time: act.volunteer_time,
      description: act.description,
      token: this.currentUser.token
    });
    console.log(body);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('http://192.168.148.6/create-personal-event', body, {headers: headers})
/*     return this.http
    .get('/mock-data/create-event.json') */
    .takeWhile((response: Response) => {
      if (response.json().sysinfo.tokenUpdate) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    }).subscribe(
      data => {
        if (data.json().sysinfo.createPersonalEvent) {
          alert("活动申请成功!");
          this.router.navigateByUrl('workspace/act/activities');
        }else {
          alert("活动申请失败 请重试!");
        }
      },
      error => console.log(error)
    );
  }

}

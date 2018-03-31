import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import { CurrentUser } from '../common/services/currentUser.data';

import { User } from '../models/user-model';

@Injectable()
export class WelcomeService {

  public currentUser: User

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  getMsg() {
    return this.http
      .get('mock-data/msg-uid-1871239223.json')
      .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
          this.router.navigateByUrl('login');
          return false;
        }
        return true;
      });
  }

  getSchdule(count: Number = 10) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      listAllEvent: '1',
      eventCount: count.toString(),
      status: '-1'
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('http://192.168.148.6/get-event', body, {headers: headers})
  /*         return this.http
    .get('mock-data/activities.json') */
    .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }).map((response: Response) => {
      let res: any[] = [];
      const data: any[] = response.json().data.events;
      data.forEach((value, idx, arr) =>
      res.push({
        "title": value.name,
        "start": value.start,
        "end": value.end
      }));
      return res;
    });
}

  getDataLine() {
  }

  getDataBar() {
  }

  getRankList() {
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { CurrentUser } from '../common/services/currentUser.data';
import * as CryptoJS from 'crypto-js';

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
    .post('/volunteer/get-event', body, {headers: headers})
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

  getUserDataLine(): Observable<any> {
    return new Observable((observer) => {
      const tmp = this.currentUser.volunteer_time;
      let res = {
        labels: [],
        datasets: [
          {
              label: 'VolTime',
              data: [],
              fill: false,
              borderColor: '#2ea700',
          }]
      };
      let nowMonth = new Date().getMonth() + 1; // 当前月份
      if (nowMonth >= 2 && nowMonth <= 8) {
        res.labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];
        res.datasets[0].data = this.currentUser.volunteer_time.slice(1, 8);
      }else {
        res.labels = ['七月', '八月', '九月', '十月', '十一月', '十二月', '一月'];
        // res.datasets[0].data = this.currentUser.volunteer_time.slice(-6, 2);
        let vTime = this.currentUser.volunteer_time
        res.datasets[0].data = vTime.slice(20, 22);
        res.datasets[0].data = res.datasets[0].data.concat(vTime.slice(9, 13));
        res.datasets[0].data.push(vTime[1]);
        // console.log(res.datasets[0].data);
      }
      observer.next(res);
      observer.complete();
    });
  }

  getOrgDataLine(): Observable<any> {
    return new Observable((observer) => {
      const tmp = this.currentUser.volunteer_time;
      let res = {
        labels: [],
        datasets: [
          {
              label: 'participants',
              data: [],
              fill: false,
              borderColor: '#d2bc17',
          }]
      };
      let nowMonth = new Date().getMonth() + 1;
      if (nowMonth >= 2 && nowMonth <= 8) {
        res.labels = ['一月', '二月', '三月', '四月', '五月', '六月', '七月'];
        res.datasets[0].data = [12, 43, 67, 47, 23, 53, 117];
      }else {
        res.labels = ['七月', '八月', '九月', '十月', '十一月', '十二月', '一月'];
        res.datasets[0].data = [12, 43, 67, 47, 23, 53, 117];
      }
      observer.next(res);
      observer.complete();
    });
  }


  getRankList(count: Number = 10) {
    const body = JSON.stringify({
      rankCount: count.toString(),
      token: this.currentUser.token,
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/get-rank', body, {headers: headers})
  /*         return this.http
    .get('mock-data/activities.json') */
    .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    }).map((response: Response) => {
      let res: any[] = response.json().data.rank;
      let ret: any = {
        labels: [],
        datasets: [
          {
              label: 'VolTime',
              data: [],
              fill: false,
              borderColor: '#2ea700',
              backgroundColor: '#2ea700'
          }]};
      res.forEach((val, idx, arr) => {
        ret.labels.push(val.name);
        ret.datasets[0].data.push(val.volunteer_time);
      });
      return ret;
    });
  }

  getActNum() {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      listAllEvent: '0',
      status: '-1',
      eventCount: '-1'
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/get-event', body, {headers: headers})
    .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    })
    .map((response: Response) => {
      const ls = response.json().data.events;
      let creatList = [];
      ls.forEach((val) => {
        if (val.type === 1) {
          creatList.push(val);
        }
      });
      localStorage.setItem('orgCreateActList', CryptoJS.AES.encrypt(JSON.stringify(creatList), 'org').toString());
      return creatList.length;
    });
  }

}

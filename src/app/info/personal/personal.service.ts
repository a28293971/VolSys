import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';


import { User } from '../../models/user-model';

@Injectable()
export class PersonalService {

  private body: JSON
  private headers: Headers

  constructor(
    private http: Http,
    private router: Router
  ) {

  }


  getAcceptedActivities(id: string, token: string, count: Number = 10) {
    const body = JSON.stringify({
      id: id,
      token: token,
      listAllEvent: '0',
      status: '1',
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

  getWaitingActivities(id: string, token: string, count: Number = 10) {
    const body = JSON.stringify({
      id: id,
      token: token,
      listAllEvent: '0',
      status: '0',
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

  getRejectedActivities(id: string, token: string, count: Number = 10) {
    const body = JSON.stringify({
      id: id,
      token: token,
      listAllEvent: '0',
      status: '2',
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

  getCreatedActivities(id: string, token: string, count: Number = 10) {
    const body = JSON.stringify({
      id: id,
      token: token,
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

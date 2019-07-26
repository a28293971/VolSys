import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';


import { User } from '../../models/user-model';
import { CurrentUser } from '../../common/services/currentUser.data';
import { Observable } from 'rxjs';

@Injectable()
export class PersonalService {

/*   private body: JSON
  private headers: Headers */
  public currentUser: User

  constructor(
    private http: Http,
    private router: Router,
    public CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  updateInfo(id: string, token: string): Observable<Response> {
    const body = {
      id: id,
      token: token
    };
    return this.http.post('/volunteer/get-info-by-token', body)
    .takeWhile((response: Response) => {
      if (!response.json().sysinfo.auth) {
          this.router.navigateByUrl('login');
          return false;
      }
      return true;
    });
  }

  // getAcceptedActivities(id: string, token: string, count: Number = 10) {
  //   const body = JSON.stringify({
  //     id: id,
  //     token: token,
  //     listAllEvent: '0',
  //     status: '1',
  //     eventCount: count.toString()
  //   });
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http
  //   .post('/volunteer/get-event', body, {headers: headers})
  //   .takeWhile((response: Response) => {
  //       if (!response.json().sysinfo.auth) {
  //           this.router.navigateByUrl('login');
  //           return false;
  //       }
  //       return true;
  //   });
  // }

  // getWaitingActivities(id: string, token: string, count: Number = 10) {
  //   const body = JSON.stringify({
  //     id: id,
  //     token: token,
  //     listAllEvent: '0',
  //     status: '0',
  //     eventCount: count.toString()
  //   });
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http
  //   .post('/volunteer/get-event', body, {headers: headers})
  //   .takeWhile((response: Response) => {
  //       if (!response.json().sysinfo.auth) {
  //           this.router.navigateByUrl('login');
  //           return false;
  //       }
  //       return true;
  //   });
  // }

  // getRejectedActivities(id: string, token: string, count: Number = 10) {
  //   const body = JSON.stringify({
  //     id: id,
  //     token: token,
  //     listAllEvent: '0',
  //     status: '2',
  //     eventCount: count.toString()
  //   });
  //   const headers = new Headers({'Content-Type': 'application/json'});
  //   return this.http
  //   .post('/volunteer/get-event', body, {headers: headers})
  //   .takeWhile((response: Response) => {
  //       if (!response.json().sysinfo.auth) {
  //           this.router.navigateByUrl('login');
  //           return false;
  //       }
  //       return true;
  //   });
  // }

  getCreatedActivities(id: string, token: string) {
    const body = {
      id: id,
      token: token,
      listAllEvent: '0',
      status: '-1',
      eventCount: '-1'
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/get-event', body, {headers: headers})
    .takeWhile((response: Response) => {
        if (!response.json().sysinfo.auth) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    });
  }

}

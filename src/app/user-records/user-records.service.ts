import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';

import { CurrentUser } from '../common/services/currentUser.data';

import { User } from '../models/user-model';

@Injectable()
export class UserRecordsService {
  public currentUser: User;


  constructor(
    private router: Router,
    private http: Http,
    public CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  getUserRecords(grade: number) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      grade: grade
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/get-user-records', body, {headers: headers})
    // .get('mock-data/activities.json')
    .takeWhile((response: Response) => {
        if (response.json().sysinfo.tokenUpdate) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    });
  }

}

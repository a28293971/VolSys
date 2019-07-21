import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { User } from '../../models/user-model';
import { CurrentUser } from '../../common/services/currentUser.data';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ChangePwdService {
  public currentUser: User

  constructor(
    private CUser: CurrentUser,
    private http: Http,
    public router: Router
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  public sendNewPassword(pwd: string) {
    const body = JSON.stringify({
      id: this.currentUser.id,
      token: this.currentUser.token,
      password: CryptoJS.MD5(pwd).toString()
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http
    .post('/volunteer/change-pwd', body, {headers: headers})
    .takeWhile((response: Response) => {
        if (!response.json().sysinfo.auth) {
            this.router.navigateByUrl('login');
            return false;
        }
        return true;
    });
  }

}

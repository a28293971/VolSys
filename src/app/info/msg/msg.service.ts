import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeWhile';
import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';

@Injectable()
export class MsgService {

  public currentUser: User

  constructor(
    private http: Http,
    private router: Router,
    private CUser: CurrentUser
) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
}

  getMsgList(page: Number = 1) {
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

}

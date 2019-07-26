import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { User } from './models/user-model';
import { AuthGuard } from './auth/auth.guard';
import { CurrentUser } from './common/services/currentUser.data';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class AppService {

  constructor(
    public http: Http,
    private CUser: CurrentUser,
    private authGuard: AuthGuard,
    private router: Router
  ) { }

  public tokenLogin(currentUser) {
    const body = {
      id: currentUser.id,
      token: currentUser.token
    };
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/volunteer/get-info-by-token', body, {headers: headers})
      .subscribe((response: Response) => {
          const res = response.json();
          if (res.sysinfo.auth === 1 && res.sysinfo.getInfoByToken === 1) {
              currentUser.events = res.data.events;
            if (!currentUser.isAdmin) {
              currentUser.volunteer_time = res.data.volunteer_time;
              currentUser.score = res.data.score;
            }
            // localStorage.setItem('currentUser', CryptoJS.AES.encrypt(JSON.stringify(currentUser), 'fuck').toString());
            this.authGuard.isLoggedIn = true;
            this.CUser.update(currentUser);
            this.router.navigateByUrl('/workspace/welcome');
          }else {
            alert('认证失败，系统发生错误，请重试');
          }
        },
      error =>  console.error(error)
      );
  }

}

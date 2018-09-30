import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user-model';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/services/currentUser.data';
import * as CryptoJS from 'crypto-js';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Injectable()
export class LoginService {
  private userLoginURL = 'http://192.168.148.6/login';
  // public subject: Subject<User> = new Subject<User>();
  public rMsg: Subject<number> = new Subject<number>();

/*   public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  } */

  constructor(
    public http: Http,
    private authGuard: AuthGuard,
    private CUser: CurrentUser
  ) { }

  public login(user: User) {
    // console.log(user);
/*     let obj = '';
    if (user.id[0] === '1') {
      obj = 'org';
      this.userLoginURL = 'mock-data/org-login-mock.json';
    }else {
      obj = 'user';
      this.userLoginURL = 'mock-data/user-login-mock.json';
    } */
    const body = JSON.stringify({
      id: user.id,
      password: CryptoJS.MD5(user.password).toString(),
      authType: 1
    });
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/volunteer/login', body, {headers: headers})
/*     return this.http.get('mock-data/' + obj + '-login-mock.json') */
      .subscribe((response: Response) => {
          const res = response.json();
          // console.log(res);
          // console.log('user.token = ' + res.token);
          if (res.sysinfo.auth) {
            let nUser: User = res.data;
            nUser.token = res.sysinfo.token;
            if (res.sysinfo.idType) {
              nUser.isAdmin = true;
              // localStorage.setItem('currentUser', JSON.stringify(nUser));
              // localStorage.setItem('orgActivities', JSON.stringify(nUser.events));
            }else {
              // localStorage.setItem('currentUser', JSON.stringify(nUser));
              // localStorage.setItem('userActivities', JSON.stringify(nUser.events));
            }
            // delete nUser.events;
            localStorage.setItem('currentUser', CryptoJS.AES.encrypt(JSON.stringify(nUser), 'fuck').toString());
            this.CUser.update();
            // this.subject.next(Object.assign({}, nUser));
          }else {
            this.rMsg.next(Number(res.sysinfo.errType));
          }
        },
      error =>  console.error(error)
      );
  }


  public logout(): void {
    // console.log('--------succees logout!-----------');
    localStorage.clear();
    // this.http.get('http://192.168.148.6');
    this.authGuard.isLoggedIn = false;
  }

}

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user-model';
import { AuthGuard } from '../auth/auth.guard';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class LoginService {
  public userLoginURL = 'http://192.168.148.6/login';
  public subject: Subject<User> = new Subject<User>();
  public rMsg: Subject<number> = new Subject<number>();

  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }

  constructor(
    public http: Http,
    private authGuard: AuthGuard
  ) { }

  public login(user: User) {
    console.log(user);
    let obj = '';
    if (user.id[0] === '1') {
      obj = 'org';
    }else {
      obj = 'user';
    }
/*     const body = JSON.stringify({
      id: user.id,
      password: user.password,
      authType: 1
    });
    const headers = new Headers({'Content-Type': 'application/json'}); */
    // console.log('post the data');
    // console.log(body), console.log(headers);
    return this.http
      .get('mock-data/' + obj + '-login-mock.json')
      // .post(this.userLoginURL, body, {headers: headers})
      .subscribe((response: Response) => {
          const res = response.json();
          console.log(res);
          // console.log('user.token = ' + res.token);
          if (res.sysinfo.auth) {
            let nUser = res.data;
            nUser.token = res.sysinfo.token;
            if (res.sysinfo.idType) {
              nUser.isAdmin = true;
              localStorage.setItem('currentUser', JSON.stringify(nUser));
              // localStorage.setItem('orgActivities', JSON.stringify(nUser.events));
            }else {
              localStorage.setItem('currentUser', JSON.stringify(nUser));
              // localStorage.setItem('userActivities', JSON.stringify(nUser.events));
            }
            // delete nUser.events;
            this.subject.next(Object.assign({}, nUser));
          }else {
            this.rMsg.next(Number(res.sysinfo.errType));
          }
        },
      error =>  console.error(error)
      );
  }


  public logout(): void {
    console.log('--------succees logout!-----------');
    localStorage.clear();
    // this.http.get('http://192.168.148.6');
    this.authGuard.isLoggedIn = false;
  }

}

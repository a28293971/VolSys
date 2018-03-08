import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user-model';
import { AuthService } from '../auth/auth.service';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class LoginService {
  public userLoginURL = 'http://192.168.148.6/login';
  public subject: Subject<User> = new Subject<User>();
  public rPwd: Subject<boolean> = new Subject<boolean>();

  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }

  constructor(
    public http: Http,
    private authService: AuthService
  ) { }

  public login(user: User) {
    console.log(user);
    // const body = JSON.stringify({
    //   id: user.id,
    //   password: user.password
    //   // password: CryptoJS.MD5(user.password).toString()
    // });
    // const headers = new Headers({'Content-Type': 'application/json'});
    // console.log('post the data');
    // console.log(body), console.log(headers);
    return this.http
      .get('mock-data/user-login-mock.json')
      // .post(this.userLoginURL, body, {headers: headers})
      .subscribe((response: Response) => {
          const res = response.json();
          console.log(res);
          // console.log('user.token = ' + res.token);
          if (res.sysinfo.auth) {
            let nUser = new User();
            nUser.id = res.data.id, nUser.name = res.data.name, nUser.volunteer_time = res.data.volunteer_time
            nUser.token = res.sysinfo.token, nUser.college = res.data.college;
            localStorage.setItem('currentUser', JSON.stringify(nUser));
            localStorage.setItem('userActivities', JSON.stringify(res.data.events));
            this.subject.next(Object.assign({}, nUser));
          }else {
            this.rPwd.next(true);
          }
        },
      error =>  console.error(error)
      );
  }


  public logout(): void {
    console.log('--------succees logout!-----------');
    localStorage.clear();
    this.authService.isLoggedIn = false;
  }

}

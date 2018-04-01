import { Injectable } from '@angular/core';
import { User } from '../../models/user-model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CurrentUser {

  public user: User;
  public subject: Subject<User> = new Subject<User>();

  constructor(

  ) {
      // this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  public get currentUser(): Observable<User> {
    return this.subject.asObservable();
  }

  update() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.user = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('currentUser'), 'fuck').toString(CryptoJS.enc.Utf8));
    this.subject.next(this.user);
  }

}

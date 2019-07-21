import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import * as CryptoJS from 'crypto-js';

import { User } from '../../models/user-model';
import { Activity } from '../../models/activity-model';

import { PersonalService } from './personal.service';
// import { ConfirmationService } from 'primeng/components/common/api';


@Component({
  selector: 'personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
  animations: [
    flyIn
  ]
})
export class PersonalComponent implements OnInit {

  actAccepted: Activity[] = [];
  actWaiting: Activity[] = [];
  actRejected: Activity[] = [];
  actCreat: Activity[] = [];
  currentUser: User;

  constructor(
    private personalService: PersonalService
    // private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.currentUser = this.personalService.currentUser;

    if (this.currentUser.isAdmin) {
      let tmp = localStorage.getItem('orgCreateActList');
      if (tmp) {
        this.actCreat = JSON.parse(CryptoJS.AES.decrypt(tmp, 'org').toString(CryptoJS.enc.Utf8));
        this.actCreat.forEach(this.trans2Date);
        this.actCreat.sort(this.sortFunc);
      }
    }else {
      this.currentUser.events.forEach((val) => {
        if (val.status === 1) {
          val.timestamp = new Date(val.timestamp);
          this.actAccepted.push(val);
        }else if (val.status === 0) {
          val.timestamp = new Date(val.timestamp);
          this.actWaiting.push(val);
        }else if (val.status === 2 || val.status === 4) {
          val.timestamp = new Date(val.timestamp);
          this.actRejected.push(val);
        }
      });

      this.actAccepted.sort(this.sortFunc);
      this.actWaiting.sort(this.sortFunc);
      this.actRejected.sort(this.sortFunc);
    }
  }

  trans2Date(a: Activity) {
    a.timestamp = new Date(a.timestamp);
  }

  sortFunc(a: Activity, b: Activity): number {
    return b.timestamp.valueOf() - a.timestamp.valueOf();
  }

}

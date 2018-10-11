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

  actAceppted: Activity[] = [];
  actWaiting: Activity[] = [];
  actRejecte: Activity[] = [];
  actCreat: Activity[] = [];
  currentUser: User;

  constructor(
    private personalService: PersonalService
    // private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {

/*     if (this.currentUser.isAdmin) {
      this.actCreat = JSON.parse(localStorage.getItem("orgActivities"));
      this.actCreat.sort(this.sortFunc);
    }else {
      let actTmp: Activity[] = JSON.parse(localStorage.getItem("userActivities"));
      for (const i of actTmp) {
        i.timestamp = new Date(i.timestamp);
        if (i.status === 1) {
          this.actAceppted.push(i);
        }else if (i.status === 0) {
          this.actWaiting.push(i);
        }else {
          this.actRefuse.push(i);
        }
      }
      this.actAceppted.sort(this.sortFunc);
      this.actWaiting.sort(this.sortFunc);
      this.actRefuse.sort(this.sortFunc);
    } */
    this.currentUser = this.personalService.currentUser;

    if (this.currentUser.isAdmin) {
/*       this.personalService.getCreatedActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actCreat = data.json().data.events;
          this.actCreat.forEach(this.trans2Date);
          this.actCreat.sort(this.sortFunc);
        }
      ); */
      let tmp = localStorage.getItem('orgCreateActList');
      if (tmp) {
        this.actCreat = JSON.parse(CryptoJS.AES.decrypt(tmp, 'org').toString(CryptoJS.enc.Utf8));
        // localStorage.removeItem('orgCreateActList');
        this.actCreat.forEach(this.trans2Date);
        this.actCreat.sort(this.sortFunc);
      }/* else {
        this.personalService.getCreatedActivities(this.currentUser.id, this.currentUser.token, -1)
        .subscribe(
          data => {
            this.actCreat = data.json().data.events;
            this.actCreat.forEach(this.trans2Date);
            this.actCreat.sort(this.sortFunc);
          }
        );
      } */

    }else {
      /* this.personalService.getRejectedActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actRejecte = data.json().data.events;
          this.actRejecte.forEach(this.trans2Date);
          this.actRejecte.sort(this.sortFunc);
        }
      );
      this.personalService.getAcceptedActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actAceppted = data.json().data.events;
          this.actAceppted.forEach(this.trans2Date);
          this.actAceppted.sort(this.sortFunc);
        }
      );
      this.personalService.getWaitingActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actWaiting = data.json().data.events;
          this.actWaiting.forEach(this.trans2Date);
          this.actWaiting.sort(this.sortFunc);
        }
      ); */

      this.currentUser.events.forEach((val) => {
        if (val.status === 1) {
          val.timestamp = new Date(val.timestamp);
          this.actAceppted.push(val);
        }else if (val.status === 0) {
          val.timestamp = new Date(val.timestamp);
          this.actWaiting.push(val);
        }else if (val.status === 2) {
          val.timestamp = new Date(val.timestamp);
          this.actRejecte.push(val);
        }
      });

      this.actAceppted.sort(this.sortFunc);
      this.actWaiting.sort(this.sortFunc);
      this.actRejecte.sort(this.sortFunc);

    }
  }

  trans2Date(a: Activity) {
    a.timestamp = new Date(a.timestamp);
  }

  sortFunc(a: Activity, b: Activity): number {
    return b.timestamp.valueOf() - a.timestamp.valueOf();
  }

/*   showDialog(obj: Activity) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to cancel the aplly?',
        accept: () => {
          console.log('you had cancel the aplly');
        }
    });
  } */

}

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
      this.personalService.getCreatedActivities(this.currentUser.id, this.currentUser.token)
      .subscribe(res => {
        if (res.json().sysinfo.getEventResult) {
          this.actCreat = res.json().data.events;
          this.actCreat.forEach(this.trans2Date);
          this.actCreat.sort(this.sortFunc);
        }else {
          alert('获取活动列表失败');
        }
      });
    } else {
      this.personalService.updateInfo(this.currentUser.id, this.currentUser.token)
    .subscribe(res => {
      if (res.json().sysinfo.getInfoByToken) {
        const data = res.json().data;
        this.currentUser.events = data.events;
        this.currentUser.volunteer_time = data.volunteer_time;
        this.currentUser.score = data.score;

        let tmpAccepted = [], tmpWaitting = [], tmpRejected = [];
        this.currentUser.events.forEach((val) => {
          if (val.status === 1) {
            val.timestamp = new Date(val.timestamp);
            tmpAccepted.push(val);
          }else if (val.status === 0) {
            val.timestamp = new Date(val.timestamp);
            tmpWaitting.push(val);
          }else if (val.status === 2 || val.status === 4) {
            val.timestamp = new Date(val.timestamp);
            tmpRejected.push(val);
          }
        });
        this.actAccepted = tmpAccepted;
        this.actWaiting = tmpWaitting;
        this.actRejected = tmpRejected;

        this.actAccepted.sort(this.sortFunc);
        this.actWaiting.sort(this.sortFunc);
        this.actRejected.sort(this.sortFunc);

        this.personalService.CUser.update(this.currentUser);
      }else {
        alert('获取最新信息失败');
      }
    });
    }
  }

  trans2Date(a: Activity) {
    a.timestamp = new Date(a.timestamp);
  }

  sortFunc(a: Activity, b: Activity): number {
    return b.timestamp.valueOf() - a.timestamp.valueOf();
  }

}

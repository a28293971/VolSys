import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../../common/services/currentUser.data';

import { User } from '../../models/user-model';
import { Activity } from '../../models/activity-model';

import { PersonalService } from './personal.service';
import { ConfirmationService } from 'primeng/components/common/api';


@Component({
  selector: 'personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss'],
})
export class PersonalComponent implements OnInit {

  actAceppted: Activity[] = [];
  actWaiting: Activity[] = [];
  actRejecte: Activity[] = [];
  actCreat: Activity[];
  currentUser: User;

  constructor(
    private personalService: PersonalService,
    private confirmationService: ConfirmationService,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.currentUser;
  }

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

    if (this.currentUser.isAdmin) {
      this.personalService.getCreatedActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actCreat = data.json().data.events;
          this.actCreat.sort(this.sortFunc);
        }
      );
    }else {
      this.personalService.getAcceptedActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actAceppted = data.json().data.events;
          this.actAceppted.sort(this.sortFunc);
        }
      );
      this.personalService.getWaitingActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actWaiting = data.json().data.events;
          this.actWaiting.sort(this.sortFunc);
        }
      );
      this.personalService.getRejectedActivities(this.currentUser.id, this.currentUser.token, -1)
      .subscribe(
        data => {
          this.actRejecte = data.json().data.events;
          this.actRejecte.sort(this.sortFunc);
        }
      );
    }
  }

  sortFunc(a: Activity, b: Activity): number {
    return b.timestamp.valueOf() - a.timestamp.valueOf();
  }

  showDialog(obj: Activity) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to cancel the aplly?',
        accept: () => {
          console.log('you had cancel the aplly');
        }
    });
  }

}

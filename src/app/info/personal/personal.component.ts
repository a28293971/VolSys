import { Component, OnInit } from '@angular/core';

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
  actRefuse: Activity[] = [];
  currentUser: User;

  constructor(
    private personalService: PersonalService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let actTmp: Activity[] = JSON.parse(localStorage.getItem("userActivities"));
    for (const i of actTmp) {
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
    // console.log(this.actAceppted);
    // console.log(this.actWaiting);
    // console.log(this.actRefuse);

    // this.college = toCollege(this.currentUser.college);
    // this.personalService.getVolTime(this.currentUser.id)
    // .subscribe(
    //   data => this.volTime = data.json().volTime,
    //   error => {
    //     console.log('get volTime error!');
    //     console.log(error);
    //   }
    // );
    // this.personalService.getAcceptedActivities()
    // .subscribe(
    //   data => this.actAceppted = data.json().activities,
    //   error => console.log(error)
    // );
    // this.personalService.getWaitingActivities()
    // .subscribe(
    //   data => this.actWaiting = data.json().activities,
    //   error => console.log(error)
    // );
  }

  sortFunc(a: Activity, b: Activity): number {
    if (a.timestamp > b.timestamp) {
      return -1;
    }else if (a.timestamp < b.timestamp) {
      return 1;
    }else {
      return 0;
    }
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

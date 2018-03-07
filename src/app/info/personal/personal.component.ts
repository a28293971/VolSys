import { Component, OnInit } from '@angular/core';
// import { toCollege } from '../../pipe/toCollege.func';

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
  currentUser: User;
  college: string;
  volTime: number;

  constructor(
    private personalService: PersonalService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.college = toCollege(this.currentUser.college);
    this.personalService.getVolTime(this.currentUser.id)
    .subscribe(
      data => this.volTime = data.json().volTime,
      error => {
        console.log('get volTime error!');
        console.log(error);
      }
    );
    this.personalService.getAcceptedActivities()
    .subscribe(
      data => this.actAceppted = data.json().activities,
      error => console.log(error)
    );
    this.personalService.getWaitingActivities()
    .subscribe(
      data => this.actWaiting = data.json().activities,
      error => console.log(error)
    );
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

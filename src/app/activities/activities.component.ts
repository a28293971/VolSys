import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Activity } from '../models/activity-model';
import { ActivityService } from './activities.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { AuthService } from '../auth/auth.service';
// import { toCollege } from '../pipe/toCollege.func';

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = [];
  c: number = 0;
  line: number = 0;
  display: boolean = false;
  content: Activity;
  reason: string;

  constructor(
    public activityService: ActivityService,
    public confirmationService: ConfirmationService,
    public authservice: AuthService
    // private router: Router
  ) { }

  // addData(data: Activity[]) {
  //   for (const i of data) {
  //     this.activities.push(i);
  //   }
  // }

  ngOnInit() {
    this.activityService.getActivities()
    .subscribe(res => this.activities = res.json().data.allEvents);
    // this.content = this.activities[0];
  }

  // loadData(event) {
  //   this.activityService.getActivities()
  //   .subscribe(res => this.addData(res.json().data.allEvents));
  // }


  // report(obj: Activity) {
  //   this.content = obj;
  //   console.log('report -> ' + this.content.name);
  //   this.confirmationService.confirm({
  //       message: `
  //       <h4>Are you sure you want to report this activity:</h4>
  //       <h2>${this.content.name}</h2>
  //       `,
  //       accept: () => {
  //         console.log('succes to report');
  //       }
  //   });
  // }


}

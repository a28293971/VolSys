import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(
    public activityService: ActivityService,
    public confirmationService: ConfirmationService,
    public authservice: AuthService,
    private domSanitizer: DomSanitizer
    // private router: Router
  ) { }

  // addData(data: Activity[]) {
  //   for (const i of data) {
  //     this.activities.push(i);
  //   }
  // }

  ngOnInit() {
    this.activityService.getActivities(-1)
    .subscribe(res => this.activities = res.json().data.events);
    // this.content = this.activities[0];
  }

  // loadData(event) {
  //   this.activityService.getActivities()
  //   .subscribe(res => this.addData(res.json().data.allEvents));
  // }

  joinAct(act: Activity) {
    this.activityService.joinAct(act)
    .subscribe(
      data => {
        const value = data.json();
        if (value.sysinfo.auth) {
          console.log('succees to join the act');
        }else {
          console.log('failed to join');
        }
      },
      error => console.log(error)
    );
  }


  report(obj: Activity) {
    this.content = obj;
    // console.log('report -> ' + this.content.name);
    this.confirmationService.confirm({
        header: "确认窗口",
        message: `
        <h4>Are you sure you want to report this activity:</h4>
        <h2>${this.content.name}</h2>
        `,
        accept: () => {
          console.log('succes to report');
        }
    });
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from '../models/activity-model';
import { ActivityService } from './activities.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { ContentChild } from '@angular/core/src/metadata/di';
import { toCollege } from '../pipe/toCollege.func';
import { Route } from '@angular/router/src/config';

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
    private router: Router
  ) { }

  addData(data: Activity[]) {
    for (let i = 0; i < data.length; i++) {
      this.activities.push(data[i]);
      this.activities[this.line].line = this.line++;
    }
  }

  ngOnInit() {
    this.activityService.getActivities()
    .subscribe(res => this.addData(res.json().activities));
    this.content = this.activities[0];
  }

  loadData(event) {
    // console.log('in function! the c =' + this.c);
    // if (!this.activities) {
    //   this.activityService.getActivities()
    //   .subscribe(res => this.activities = res.json().activities);
    // }
    // if (this.c++ > 4) {return; }
    this.activityService.getActivities()
    .subscribe(res => this.addData(res.json().activities));
  }

  switchSate(line: number) {
    if (this.activities[line].hadApl === 'false') {
      console.log('join the activity id -> ' + this.activities[line].id);
      this.activities[line].hadApl = "true";
    } else {
      console.log('cancel join the activity id -> ' + this.activities[line].id);
      this.activities[line].hadApl = "false";
    }
  }

  report(obj: Activity) {
    this.content = obj;
    console.log('report -> ' + this.content.name);
    this.confirmationService.confirm({
        message: `
        <h4>Are you sure you want to report this activity:</h4>
        <h2>${this.content.name}</h2>
        `,
        accept: () => {
          console.log('succes to report');
        }
    });
  }

  // report(obj: Activity) {
  //   console.log('report -> ' + obj.name);
  // }

  showDialog(obj: Activity) {
    this.content = obj;
    this.confirmationService.confirm({
        message: `
        <h3>
          Name: ${this.content.name}<br>
          College: ${toCollege(this.content.college)}<br>
          Org: ${this.content.org}<br>
          VolTime: ${this.content.volTime}H<br>
          EndTime: ${this.content.endTime}
        </h3>
        <h3>Describe:</h3>
        <h4>${this.content.describe}</h4>
        `
    });
  }

}

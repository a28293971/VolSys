import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { Router } from '@angular/router';
import { Activity } from '../models/activity-model';
import { ActivityService } from './activities.service';
import { ConfirmationService } from 'primeng/components/common/api';
// import { toCollege } from '../pipe/toCollege.func';
import { flyIn } from '../animations/fly-in';

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [flyIn]
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = [];
  hadAplAct: Activity[] = [];
  c: number = 0;
  line: number = 0;
  display: boolean = false;
  content: Activity;
  isAdmin: boolean;

  constructor(
    public activityService: ActivityService,
    public confirmationService: ConfirmationService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activityService.getActivities(-1)
    .subscribe(res => this.activities = res.json().data.events);
/*     this.activityService.getHadAplAct(-1)
    .subscribe(res => this.hadAplAct = res.json().data.events); */
    // this.content = this.activities[0];
    this.isAdmin = !!this.activityService.currentUser.isAdmin;
  }


  joinAct(act: Activity) {
    this.activityService.joinAct(act)
    .subscribe(
      data => {
        const value = data.json();
        if (value.sysinfo.auth) {
          console.log('succees to join the act');
          alert('活动申请成功！');
        }else {
          console.log('failed to join');
          alert('活动申请失败！');
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
          this.activityService.reportAct(obj);
        }
    });
  }

  openCheck(event) {
    let idx = event.index;
    console.log(event.originalEvent);
/*     let eid = this.activities[idx].id;
    if (this.hadAplAct.findIndex((value, index, arr) => {
      return value.id === eid;
    }) !== -1) {
      this.activities[idx].hadApl = true;
    } */
  }

  cancelJoinAct(act: Activity) {
    console.log('fuck!');
    act.hadApl = false;
  }


}

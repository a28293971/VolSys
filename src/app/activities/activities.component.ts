import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
// import { Router } from '@angular/router';
import { Activity } from '../models/activity-model';
import { ActivityService } from './activities.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { flyIn } from '../animations/fly-in';

@Component({
  selector: 'activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  animations: [flyIn]
})
export class ActivitiesComponent implements OnInit {

  confirmationWidth: number = 500;
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
    this.isAdmin = !!this.activityService.currentUser.isAdmin;
    this.activityService.getActivities(-1)
    .subscribe(
      res => {
        this.activities = res.json().data.events;
        if (this.isAdmin) {
          this.activities.forEach((value, idx, arr) => value.idx = idx);
        }
    });
    if (!this.isAdmin) {
      this.activityService.getHadAplAct0(-1)
      .subscribe(res0 => {
        this.hadAplAct = res0.json().data.events
        this.activityService.getHadAplAct1(-1)
        .subscribe(res1 => {
          this.hadAplAct.concat(res1.json().data.events);
          this.activityService.getHadAplAct2(-1)
          .subscribe(res2 => this.hadAplAct.concat(res2.json().data.events))
        });
      });
      if (this.activityService.CUser.mobileAccess === true) {
        this.confirmationWidth = 300;
      }
    }
    // this.content = this.activities[0];
  }


  joinAct(act: Activity) {
    if (act.hadApl) {
      alert('次活动在此前已申请过,请勿重复申请！');
    }else if (this.hadAplAct.findIndex((value, index, arr) => value.id === act.id) !== -1) {
        act.hadApl = true;
        alert('次活动在此前已申请过,请勿重复申请！');
    }

    if (!act.hadApl) {
      this.activityService.joinAct(act)
      .subscribe(
        data => {
          const value = data.json();
          if (value.sysinfo.auth) {
            act.hadApl = true;
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
  }


  report(obj: Activity) {
    this.content = obj;
    // console.log('report -> ' + this.content.name);
    this.confirmationService.confirm({
        header: "确认窗口",
        message: `
        <h4>确定要对一下活动进行反馈吗？:</h4>
        <h2>${this.content.name}</h2>
        `,
        accept: () => {
          this.activityService.reportAct(obj);
        }
    });
  }

  openCheck(event) {
    console.log(event);
/*     console.log(idx);
    console.log(eid); */
/*     if (this.hadAplAct.findIndex((value, index, arr) => value.id === eid) !== -1) {
      this.activities[idx].hadApl = true;
    } */
  }

  cancelJoinAct(act: Activity) {
    console.log('fuck!');
    act.hadApl = false;
  }


}

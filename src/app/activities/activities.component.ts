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

  public confirmationWidth: number = 500;
  public activities: Activity[] = [];
  // hadAplAct: Activity[] = [];
  // c: number = 0;
  // line: number = 0;
  // display: boolean = false;
  private content: Activity;
  private isAdmin: boolean;

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
        if (res.json().sysinfo.auth) {
          this.activities = res.json().data.events;
          if (!this.isAdmin) {
            // this.activities.forEach((value, idx, arr) => value.idx = idx);
            this.activityService.getUserEvnetList()
            .subscribe(
              data => {
                if (data.json().sysinfo.auth) {
                  let list = data.json().data;
                  let idx;
                  this.activities.forEach((val) => {
                    val.status = -1;
                    val.loading = false;
                    idx = list.findIndex((des) => des.id === val.id)
                    if (idx !== -1) {
                      val.status = list[idx].status;
                    }
                  });
                }else {
                  alert('活动列表获取失败');
                  // console.log('活动列表获取失败')
                }
              },
              err => console.log(err)
            );
          }
      }else {
        alert('活动列表获取失败');
        // console.log('活动列表获取失败')
      }
    },
    err => console.log(err)
  );
    if (!this.isAdmin) {
      /* this.activityService.getHadAplAct0(-1)
      .subscribe(res0 => {
        this.hadAplAct = res0.json().data.events
        this.activityService.getHadAplAct1(-1)
        .subscribe(res1 => {
          this.hadAplAct.concat(res1.json().data.events);
          this.activityService.getHadAplAct2(-1)
          .subscribe(res2 => this.hadAplAct.concat(res2.json().data.events))
        });
      }); */

      if (this.activityService.CUser.mobileAccess === true) {
        this.confirmationWidth = 300;
      }
    }
    // this.content = this.activities[0];
  }


  joinAct(act: Activity) {
/*     if (act.hadApl) {
      alert('次活动在此前已申请过,请勿重复申请！');
    }else if (this.hadAplAct.findIndex((value, index, arr) => value.id === act.id) !== -1) {
        act.hadApl = true;
        alert('次活动在此前已申请过,请勿重复申请！');
    } */

    if (act.status !== 0) {
      act.disabled = act.loading = true;
      this.activityService.joinAct(act)
      .subscribe(
        data => {
          const value = data.json();
          if (value.sysinfo.joinEvent) {
            act.status = 0;
            // console.log('succees to join the act');
            alert('活动申请成功！');
          }else {
            // console.log('failed to join');
            if (value.sysinfo.errType === 1) {
              alert('该活动已被删除');
            }else {
              alert('活动申请失败 请重试');
            }
          }
        },
        error => console.log(error),
        () => act.disabled = act.loading = false
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

/*   openCheck(event) {
    // console.log(event);
    console.log(idx);
    console.log(eid);
    if (this.hadAplAct.findIndex((value, index, arr) => value.id === eid) !== -1) {
      this.activities[idx].hadApl = true;
    }
  } */

  cancelJoinAct(act: Activity) {
    // console.log('fuck!');
    act.disabled = act.loading = true;
    this.confirmationService.confirm({
      header: "确认窗口",
      message: `
      <h3>确认要对已申请的活动撤销申请吗？</h3>
      `,
      accept: () => {
        this.activityService.cancelJoinEvent(act)
        .subscribe(
          data => {
            const val = data.json();
            if (val.sysinfo.cancelJoinEvent) {
              act.status = 3;
              alert('取消申请成功');
            }else {
              if (val.sysinfo.errType) {
                alert('该活动已被删除');
              }else {
                alert('取消申请失败');
              }
            }
          },
          err => console.log(err),
          () => act.disabled = act.loading = false
        );
      },
      reject: () => act.disabled = act.loading = false
    });
  }


}

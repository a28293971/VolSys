import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Activity } from '../models/activity-model';

import { ApproveService } from './approve.service';
import { ActivityService } from './public-activity/activity.service'
import { ConfirmationService } from 'primeng/components/common/api';

import { flyIn } from '../animations/fly-in';
import { AnimationTransitionInstructionType } from '@angular/animations/browser/src/render/animation_engine_instruction';

@Component({
  selector: 'approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
  animations: [flyIn]
})
export class ApproveComponent implements OnInit {

  public act: Activity[] = [];
  public mobileAccess: boolean = false;
  public cols: any[] = [];

  constructor(
    private activityService: ActivityService,
    private approveService: ApproveService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.approveService.getNeedApproveActivities()
    .subscribe(
      data => {
        if (data.json().sysinfo.getEventResult) {
          let tmp = [];
          data.json().data.events.forEach((val) => {
            if (val.type === 1) {
              tmp.push(val);
            }
          });
          this.act = tmp;
          this.act.forEach((val, idx) => val.idx = idx);
      }else {
        alert('列表获取失败');
      }
    },
      error => console.error(error)
    );

    this.mobileAccess = this.approveService.CUser.mobileAccess;
    this.cols = [
      { field: 'name', header: '活动名称' },
      { field: 'volunteer_time', header: '志愿时间' },
      { field: 'end', header: '活动结束时间' }
    ];
  }

  goToApprove(act: Activity) {
    this.activityService.eInfo = act;
    this.router.navigateByUrl('/workspace/apr/activity/' + act.id);
  }

  deleteAct(act: Activity) {
    this.confirmationService.confirm({
      header: '删除活动',
      message: `<h5>请再三确认你是否要删除以下活动</h5>
                <h2>${act.name}</h2>`,
      accept: () => {
        this.approveService.deleteAct(act)
        .subscribe(
          data => {
            if (data.json().sysinfo.deleteEvent) {
              act.hide = true;
            }
          },
          error => console.error(error)
        );
      }
    });
  }

}

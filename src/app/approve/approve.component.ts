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
        // let events = data.json().data.events;
        // this.act = data.json().data.events;
        // this.act.forEach((val, idx, arr) => val.idx = idx);
        data.json().data.events.forEach((val) => {
          console.log(val.type);
          if (val.type === 1) {
            this.act.push(val);
            console.log('---in---')
          }
        });
        console.log(this.act);
        this.act.forEach((val, idx) => val.idx = idx);
    },
      error => console.log(error)
    );

    this.mobileAccess = this.approveService.CUser.mobileAccess;
  }

  goToApprove(act: Activity) {
    this.activityService.eInfo = act;
    this.router.navigateByUrl('/workspace/apr/activity/' + act.id);
  }

  deleteAct(act: Activity) {
    this.confirmationService.confirm({
      header: '删除活动',
      message: `<h5>请再三确认你是否要删除一下活动</h5>
                <h2>${act.name}</h2>`,
      accept: () => {
        this.approveService.deleteAct(act)
        .subscribe(
          data => {
            if (data.json().sysinfo.deleteEvent) {
              // this.act.splice(act.idx, 1);
              act.hide = true;
            }
          },
          error => console.log(error)
        );
      }
    });
  }

}

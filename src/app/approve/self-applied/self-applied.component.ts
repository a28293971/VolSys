import { Component, OnInit } from '@angular/core';

import { Activity } from '../../models/activity-model';

import { SelfAppliedService } from './self-applied.service';


import { flyIn } from '../../animations/fly-in';
import { AnimationTransitionInstructionType } from '@angular/animations/browser/src/render/animation_engine_instruction';

@Component({
  selector: 'self-applied',
  templateUrl: './self-applied.component.html',
  styleUrls: ['./self-applied.component.scss'],
  animations: [flyIn]
})
export class SelfAppliedComponent implements OnInit {

  public actWaiting: Activity[] = [];
  public actDone: Activity[] = [];
  public mobileAccess: boolean = false;
  public cols: any[] = [];

  constructor(
    private selfAppliedService: SelfAppliedService
  ) { }

  ngOnInit() {
    this.selfAppliedService.getNeedApproveActivities()
    .subscribe(
      data => {
        if (data.json().sysinfo.getEventResult) {
          let tmp = [], tmp1 = [];
          data.json().data.events.forEach((val) => {
            if (val.type === 2) {
              if (!val.members[0].status) {
                val.editTime = val.volunteer_time;
                tmp.push(val);
              }else {
                tmp1.push(val);
              }
            }
          });
          this.actWaiting = tmp;
          this.actDone = tmp1;
        }else {
          alert('获取活动列表失败');
        }
      },
      error => console.error(error)
    );

    this.mobileAccess = this.selfAppliedService.CUser.mobileAccess;
    this.cols = [
      { field: 'name', header: '活动名称' },
      { field: 'start', header: '开始时间' },
      { field: 'end', header: '结束时间' },
      { field: 'created', header: '申请时间' },
      { field: 'members.0.id', header: '申请学生' }
    ];
  }

  public approveActivity(act) {
    if (act.editTime == null || act.editTime < 0 || act.editTime > act.volunteer_time) {
      return;
    }

    const member = [{
      id: act.members[0].id,
      approval: '1',
      ratio: act.editTime / act.volunteer_time,
      time: act.editTime
    }];
    const data = {
      members: member,
      eid: act.id,
    }
    this.selfAppliedService.sendMembers(data)
    .subscribe(
      response => {
        if (response.json().sysinfo.approveEvent) {
          act.hide = 1;
          this.actDone.push(act);
        }else {
          alert('操作失败 请重试');
        }
      },
      error => console.error(error)
    );
  }

  public rejectActivity(act) {
    const member = [{
      id: act.members[0].id,
      approval: '2'
    }];
    const data = {
      members: member,
      eid: act.id,
    }
    this.selfAppliedService.sendMembers(data)
    .subscribe(
      response => {
        if (response.json().sysinfo.approveEvent) {
          act.hide = 1;
          this.actDone.push(act);
        } else {
          alert('操作失败 请重试');
        }
      },
      error => console.error(error)
    );
  }
}

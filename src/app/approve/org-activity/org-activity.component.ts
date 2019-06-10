import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/activity-model';

import { OrgActivityService } from './org-activity.service';
import { ConfirmationService } from 'primeng/components/common/api';

import { flyIn } from '../../animations/fly-in';

@Component({
  selector: 'org-activity',
  templateUrl: './org-activity.component.html',
  styleUrls: ['./org-activity.component.scss'],
  animations: [flyIn]
})
export class OrgActivityComponent implements OnInit {
  public mobileAccess: boolean = false;
  public cols: any[] = [];
  public activities: Activity[] = [];

  constructor(
    private orgActivityService: OrgActivityService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.mobileAccess = this.orgActivityService.CUser.mobileAccess;
    this.cols = [
      { field: 'name', header: '活动名称' },
      { field: 'start', header: '开始时间' },
      { field: 'end', header: '结束时间' },
      { field: 'created', header: '申请时间' },
      { field: 'org_name.0', header: '创立组织' }
    ];
    this.orgActivityService.getActivities()
    .subscribe(data => {
      if (data.json().sysinfo.auth) {
        this.activities = data.json().data.events;
      }
    });
  }

  aprAct(act) {
    this.confirmationService.confirm({
      header: '通过活动',
      message: `<h5>确认要通过以下活动吗?</h5>
                <h2>${act.name}</h2>`,
      accept: () => {
        this.orgActivityService.optActivity(act, 0)
        .subscribe(data => {
          let res = data.json();
          if (res.sysinfo.optOrgEvent) {
            act.hide = 1;
          }else {
            alert('操作失败！请重试');
          }
        });
      }
    });
  }

  rejAct(act) {
    this.confirmationService.confirm({
      header: '拒绝活动',
      message: `<h5>确认要拒绝以下活动吗?</h5>
                <h2>${act.name}</h2>`,
      accept: () => {
        this.orgActivityService.optActivity(act, 2)
        .subscribe(data => {
          let res = data.json();
          if (res.sysinfo.optOrgEvent) {
            act.hide = 1;
          }else {
            alert('操作失败！请重试');
          }
        });
      }
    });
  }
}

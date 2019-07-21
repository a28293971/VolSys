import { Component, OnInit } from '@angular/core';

import { ActivityService } from './activity.service';
import { ConfirmationService } from 'primeng/components/common/api';

import { Member } from '../../models/member-model';

import { flyIn } from '../../animations/fly-in';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  animations: [flyIn]
})
export class ActivityComponent implements OnInit {

  mobileAccess: boolean = false;
  actName: string;
  actVolunteerTime: number;
  membersWaiting: Member[] = [];
  membersDone: any[] = [];
  selectedMembers: Member[] = [];
  public cols = [
    { field: 'id', header: '学号' },
    { field: 'name', header: '姓名' },
    { field: 'timestamp', header: '申请时间' }
    ];


  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.actName = this.activityService.eInfo.name;
    this.actVolunteerTime = this.activityService.eInfo.volunteer_time;
    if (this.activityService.eInfo.members) {
      let a = 0, b = 0;
      this.activityService.eInfo.members.forEach((val) => {
        if (val.status === 0) {
          val.idx = a++;
          val.hide = false;
          val.time = this.actVolunteerTime;
          this.membersWaiting.push(val);
        }else if (val.status !== 3) {
          val.idx = b++;
          this.membersDone.push(val);
        }
      });
    }

    this.mobileAccess = this.activityService.CUser.mobileAccess;
  }

  aprSingleMeb(mb: Member) {
    if (mb.time == null || mb.time < 0 || mb.time > this.actVolunteerTime) {
      return;
    }
    const member = [{
      id: mb.id,
      approval: '1',
      ratio: mb.time / this.actVolunteerTime,
      time: mb.time
    }];
    this.activityService.sendMembers(member)
    .subscribe(
      data => {
        if (data.json().sysinfo.approveEvent) {
          mb.hide = true;
          this.membersDone.push({
            id: mb.id,
            name: mb.name,
            timestamp: new Date().toISOString(),
            status: 1,
            ratio: mb.ratio,
            volunteer_time: mb.time
          });
        }
      },
      error => console.error(error)
    );
  }

  aprMutileMeb() {
    if (!this.selectedMembers) { return; }
    for (const mb of this.selectedMembers) {
      if (mb.time == null || mb.time < 0 || mb.time > this.actVolunteerTime) {
        return;
      }
    }

    let members = [];
    this.selectedMembers.forEach((val) =>
      members.push({
        id: val.id,
        approval: '1',
        ratio: val.time / this.actVolunteerTime,
        time: val.time
      }));

    this.activityService.sendMembers(members)
    .subscribe(
      data => {
        if (data.json().sysinfo.approveEvent) {
          this.selectedMembers.forEach((val) => {
            val.hide = true;
            this.membersDone.push({
              id: val.id,
              name: val.name,
              timestamp: new Date().toISOString(),
              status: 1,
              ratio: val.ratio,
              volunteer_time: val.time
            });
          });
          this.selectedMembers = [];
        }
      },
      error => console.error(error)
    );
  }

  rejSingleMeb(mb: Member) {
    const member = [{
      id: mb.id,
      approval: '2'
    }];
    this.activityService.sendMembers(member)
    .subscribe(
      data => {
        if (data.json().sysinfo.approveEvent) {
          mb.hide = true;
          this.membersDone.push({
            id: mb.id,
            name: mb.name,
            timestamp: new Date().toISOString(),
            status: 2,
            ratio: 0,
            volunteer_time: 0
          });
        }
      },
      error => console.error(error)
    );
  }

  rejMutileMeb() {
    if (!this.selectedMembers) { return; }
    let members = [];
    this.selectedMembers.forEach((val) =>
      members.push({
        id: val.id,
        approval: '2'
      }));

    this.activityService.sendMembers(members)
    .subscribe(
      data => {
        if (data.json().sysinfo.approveEvent) {
          this.selectedMembers.forEach((val) => {
            val.hide = true;
            this.membersDone.push({
              id: val.id,
              name: val.name,
              timestamp: new Date().toISOString(),
              status: 2,
              ratio: 0,
              volunteer_time: 0
            });
          });
          this.selectedMembers = [];
        }
      },
      error => console.error(error)
    );
  }

  undoOpt(mb: Member) {
    this.confirmationService.confirm({
      message: `请问你确定要撤销对这个同学的操作吗`,
      accept: () => {
        const member = [{
          id: mb.id,
          approval: '0',
        }];
        this.activityService.sendMembers(member)
        .subscribe(
          data => {
            if (data.json().sysinfo.approveEvent) {
              let idxDone = this.membersDone.findIndex((val) => val.id === mb.id);
              let idxWaiting = this.membersWaiting.findIndex((val) => val.id === mb.id);
              if (idxDone !== -1) {
                this.membersDone.splice(idxDone, 1);
                if (idxWaiting !== -1) {
                  this.membersWaiting[idxWaiting].hide = false;
                }else {
                  this.membersWaiting.push({
                    id: mb.id,
                    name: mb.name,
                    timestamp: new Date().toISOString(),
                    status: 2,
                    ratio: 0,
                    time: this.actVolunteerTime
                  });
                }
              }else {
                console.log('can not found the val');
              }
            }
          },
          error => console.error(error)
        );
      }
    });
  }

}

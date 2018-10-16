import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

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
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'timestamp', header: 'AplTime' }
    ];


  constructor(
/*     private activeRoute: ActivatedRoute, */
    private activityService: ActivityService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.actName = this.activityService.eInfo.name;
    this.actVolunteerTime = this.activityService.eInfo.volunteer_time;
    if (this.activityService.eInfo.members) {
      let a = 0, b = 0;
      this.activityService.eInfo.members.forEach((val, idx, arr) => {
        if (val.status === 0) {
          val.idx = a++;
          val.hide = false;
          val.time = this.actVolunteerTime;
          this.membersWaiting.push(val);
        }else {
          val.idx = b++;
          this.membersDone.push(val);
        }
      });
    }

/*     this.activeRoute.params.subscribe(
      params => {
        const eId = params['id'];
        this.activityService.eId = eId;
        this.getActivityById(eId);
      }
    ); */
    this.mobileAccess = this.activityService.CUser.mobileAccess;
  }

/*   getActivityById(id: number) {
    return this.activityService.getActivityMembers(id)
    .subscribe(
      data => {
        this.members = data.members;
        this.actName = data.name;
      },
      error => console.log(error)
    );
  } */

  aprSingleMeb(mb: Member) {
    // console.log('-----in-----')
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
        if (data.json().sysinfo.auth) {
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
      error => console.log(error)
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
    this.selectedMembers.forEach((val, idx, mbs) =>
      members.push({
        id: val.id,
        approval: '1',
        ratio: val.time / this.actVolunteerTime,
        time: val.time
      }));

    this.activityService.sendMembers(members)
    .subscribe(
      data => {
        if (data.json().sysinfo.auth) {
          this.selectedMembers.forEach((val, idx, mbs) => {
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
      error => console.log(error)
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
        if (data.json().sysinfo.auth) {
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
      error => console.log(error)
    );
  }

  rejMutileMeb() {
    if (!this.selectedMembers) { return; }
    let members = [];
    this.selectedMembers.forEach((val, idx, mbs) =>
      members.push({
        id: val.id,
        approval: '2'
      }));

    this.activityService.sendMembers(members)
    .subscribe(
      data => {
        if (data.json().sysinfo.auth) {
          this.selectedMembers.forEach((val, idx, mbs) => {
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
      error => console.log(error)
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
            if (data.json().sysinfo.auth) {
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
          error => console.log(error)
        );
      }
    });
  }

}

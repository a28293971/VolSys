import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

import { ActivityService } from './activity.service';

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
  public imgAdr: string;
  public imgWid: number;

  constructor(
/*     private activeRoute: ActivatedRoute, */
    private activityService: ActivityService
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
    this.imgAdr = 'uploads/' + this.activityService.eInfo.files[0].name;
    this.imgWid = document.body.clientWidth * 0.7;
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
    const member = [{
      id: mb.id,
      approval: '1',
      ratio: mb.ratio,
      time: mb.ratio * this.actVolunteerTime
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
            volunteer_time: mb.ratio * this.actVolunteerTime
          });
        }
      },
      error => console.log(error)
    );
  }

  aprMutileMeb() {
    if (!this.selectedMembers) { return; }
    let members = [];
    this.selectedMembers.forEach((val, idx, mbs) =>
      members.push({
        id: val.id,
        approval: '1',
        ratio: val.ratio,
        time: val.ratio * this.actVolunteerTime
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
              volunteer_time: val.ratio * this.actVolunteerTime
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
      approval: '0'
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
        approval: '0'
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

}

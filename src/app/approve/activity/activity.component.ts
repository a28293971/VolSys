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

  actName: string;
  actVolunteerTime: number;
  members: Member[] = [];
  selectedMembers: Member[];
  public cols = [
    { field: 'id', header: 'Id' },
    { field: 'name', header: 'Name' },
    { field: 'timestamp', header: 'AplTime' }
    ];

  constructor(
/*     private activeRoute: ActivatedRoute, */
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.actName = this.activityService.eInfo.name;
    this.actVolunteerTime = this.activityService.eInfo.volunteer_time;
    this.members = this.activityService.eInfo.members;
/*     this.activeRoute.params.subscribe(
      params => {
        const eId = params['id'];
        this.activityService.eId = eId;
        this.getActivityById(eId);
      }
    ); */
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

        }
      },
      error => console.log(error)
    );
  }

  aprMutileMeb() {
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

        }
      },
      error => console.log(error)
    );
  }

  rejMutileMeb() {
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

        }
      },
      error => console.log(error)
    );
  }

}

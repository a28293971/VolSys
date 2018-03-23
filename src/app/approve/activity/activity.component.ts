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

  aprSingleMeb(id: string) {
    const member = [{
      id: id,
      approval: '1',
      ratio: '',
      time: ''
    }];
    this.activityService.aprMembers(member)
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
        ratio: '',
        time: ''
      }));

    this.activityService.aprMembers(members)
    .subscribe(
      data => {
        if (data.json().sysinfo.auth) {

        }
      },
      error => console.log(error)
    );
  }

}

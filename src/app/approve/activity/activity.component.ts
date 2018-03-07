import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActivityService } from './activity.service';

import { Member } from '../../models/member-model';

@Component({
  selector: 'activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  actName: string;
  members: Member[] = [];
  selectedMembers: Member[];

  constructor(
    private activeRoute: ActivatedRoute,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      params => this.getActivityById(params['id'])
    );
  }

  getActivityById(id: number) {
    return this.activityService.getActivityMembers(id)
    .subscribe(
      data => {
        this.members = data.members;
        this.actName = data.name;
      },
      error => console.log(error)
    );
  }

}

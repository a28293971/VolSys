import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity-model';
import { Router } from '@angular/router';

import { ApproveService } from './approve.service';
import { ActivityService } from './activity/activity.service'

import { flyIn } from '../animations/fly-in';

@Component({
  selector: 'approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
  animations: [flyIn]
})
export class ApproveComponent implements OnInit {

  public act: Activity[] = [];

  constructor(
    private activityService: ActivityService,
    private approveService: ApproveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.approveService.getNeedApproveActivities()
    .subscribe(
      data => this.act = data.json().data.events,
      error => console.log(error)
    );
  }

  goToApprove(act: Activity) {
    this.activityService.eInfo = act;
    this.router.navigateByUrl('/workspace/apr/activity/' + act.id);
  }

}

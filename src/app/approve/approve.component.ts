import { Component, OnInit } from '@angular/core';
import { Activity } from '../models/activity-model';
import { Router } from '@angular/router';

import { ApproveService } from './approve.service';

@Component({
  selector: 'approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  act: Activity[] = [];

  constructor(
    private approveService: ApproveService,
    private router: Router
  ) { }

  ngOnInit() {
    this.approveService.getNeedApproveActivities()
    .subscribe(
      data => this.act = data.json().activities,
      error => console.log(error)
    );
  }

  goToApprove(id: number) {
    this.router.navigateByUrl('/workspace/apr/activity/' + id);
  }

}

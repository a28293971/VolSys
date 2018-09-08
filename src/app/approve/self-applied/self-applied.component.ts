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

  public act: Activity[] = [];
  public mobileAccess: boolean = false;

  constructor(
    private selfAppliedService: SelfAppliedService
  ) { }

  ngOnInit() {
    this.selfAppliedService.getNeedApproveActivities()
    .subscribe(
      data => {
        data.json().data.events.forEach((val, idx, arr) => {
          if (val.type === 2) {
            val.editTime = 0;
            this.act.push(val);
          }
        });
      },
      error => console.log(error)
    );

    this.mobileAccess = this.selfAppliedService.CUser.mobileAccess;
  }

  public approveActivity(act) {
    console.log(act);
  }
}

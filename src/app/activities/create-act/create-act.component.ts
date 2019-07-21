import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flyIn } from '../../animations/fly-in';
import { CreateActService } from './create-act.service';
import { Activity } from '../../models/activity-model';
import { User } from '../../models/user-model';

@Component({
  selector: 'create-act',
  templateUrl: './create-act.component.html',
  styleUrls: ['./create-act.component.scss'],
  animations: [
    flyIn
  ]
})
export class CreateActComponent implements OnInit {

  act: Activity = new Activity();
  currentUser: User;
  college: string;

  constructor(
    private createActService: CreateActService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.currentUser = this.createActService.currentUser;
    this.act.start = new Date().toISOString().substr(0, 10);
  }

  createAct() {
    if (new Date(this.act.start) > new Date(this.act.end)) {
      alert('起始时间必须大于结束时间！');
      return;
    }
    this.act.org_name = [this.currentUser.name];
    this.act.org_id = [this.currentUser.id];
    this.createActService.create(this.act)
    .subscribe(
      data => {
        if (data.json().sysinfo.createEvent) {
          alert("活动创建成功!");
          this.router.navigateByUrl('workspace/act/activities');
        }else {
          alert("活动创建失败 请重试!");
        }
      },
      error => console.error(error)
    );
  }

}

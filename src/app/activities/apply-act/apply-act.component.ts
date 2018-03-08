import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import { User } from '../../models/user-model';
import { ApplyAct } from '../../models/apply-model';
import { ApplyActService } from './apply-act.service';

@Component({
  selector: 'apply-act',
  templateUrl: './apply-act.component.html',
  styleUrls: ['./apply-act.component.scss'],
  animations: [
    flyIn
  ]
})
export class ApplyActComponent implements OnInit {

  act: ApplyAct = new ApplyAct();
  currentUser: User;
  aplTime: Date = new Date();

  constructor(
    private applyActService: ApplyActService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  apllyAct() {
    // console.log('had aplly!');
    this.act.id = this.currentUser.id;
    this.act.name = this.currentUser.name;
    this.act.college = this.currentUser.college;
    this.act.aplTime = this.aplTime.toISOString().substr(0, 10);
    this.applyActService.apply(this.act);
  }

}

import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import { CreateActService } from './create-act.service';
import { Activity } from '../../models/activity-model';
import { User } from '../../models/user-model';
// import { toCollege } from '../../pipe/toCollege.func';


// class Data {
//   years: number;
//   month: number;
//   day: number;
// }

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
  // edT: Data = new Data();
  currentUser: User;
  college: string;

  constructor(
    private createActService: CreateActService
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.act.startTime = new Date().toISOString().substr(0, 10);
    console.log(this.act.startTime);
    // this.college = toCollege(this.currentUser.college);
  }

  createAct() {
    // this.act.endTime = '20' + this.edT.years + '-' + this.edT.month + '-' + this.edT.day;
    this.act.college = this.currentUser.college;
    this.act.org = this.currentUser.name;
    this.act.orgId = this.currentUser.id;
    this.createActService.create(this.act);
  }

}

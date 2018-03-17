import { Component, OnInit } from '@angular/core';
import { flyIn } from '../../animations/fly-in';
import { CreateActService } from './create-act.service';
import { Activity } from '../../models/activity-model';
import { User } from '../../models/user-model';
import { CurrentUser } from '../../common/services/currentUser.data';
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
    private createActService: CreateActService,
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.currentUser;
  }

  ngOnInit() {
    this.act.start = new Date().toISOString().substr(0, 10);
    // console.log(this.act.end);
    // this.college = toCollege(this.currentUser.college);
  }

  createAct() {
    this.act.org_name = [this.currentUser.name];
    this.act.org_id = [this.currentUser.id];
    this.act.token = this.currentUser.token;
    this.createActService.create(this.act);
  }

}

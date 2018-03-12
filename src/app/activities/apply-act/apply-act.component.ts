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
    let formData = new FormData();
    formData.append("enctype", "multipart/form-data");
    formData.append("id", this.currentUser.id.toString());
    formData.append("file", this.act.other);
    formData.append("token", this.currentUser.token);
    this.applyActService.apply(formData);
  }

  // fileWork(event) {
  //   let formData = new FormData();
  //   formData.append("enctype", "multipart/form-data");
  //   formData.append("id", this.currentUser.id.toString());
  //   formData.append("file", event.target.files[0]);
  //   formData.append("token", this.currentUser.token);
  //   this.applyActService.apply(formData);
  // }

}

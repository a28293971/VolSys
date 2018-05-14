import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { flyIn } from '../animations/fly-in';
import { Subscription } from 'rxjs/Subscription';

import { QuestionBase } from '../models/questions/question-base-model';
import { SelectorMatcher } from '@angular/compiler';
import { User } from '../models/user-model';

import { HelpService } from './help.service';


@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: [flyIn]
})
export class HelpComponent implements OnInit, AfterViewInit {

  public description: string;
  public helpType: any[] = [
    { name: '意见反馈', idx: 0 },
    { name: '活动反馈', idx: 1 }
  ];
  public form: FormGroup;
  public questions: any[];
  public selectHelpType: number = 0;
  private edata: any;
  public currentUser: User

  constructor(
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.questions = this.helpService.getQuestions(this.selectHelpType);
    this.form = this.helpService.toFormGroup(this.questions);

    this.currentUser = this.helpService.currentUser;
    if (!this.currentUser.isAdmin) {
      this.edata = JSON.parse(localStorage.getItem('feedbackAct'));
      // console.log(this.edata);
      if (this.edata) {
        localStorage.removeItem('feedbackAct');
        this.selectHelpType = 1;
        this.changeForm(this.selectHelpType);
        this.form.patchValue({
          actId: this.edata.eid,
          actName: this.edata.ename
        });
      }else {
        this.selectHelpType = 0;
      }
    }else {
      this.helpType.splice(1, 1);
    }
/*     if (this.edata) {
      this.form.patchValue({
        actId: this.edata.eid,
        actName: this.edata.ename
      });
    } */
  }
  ngAfterViewInit() {

  }

  changeForm(idx) {
    this.questions = this.helpService.getQuestions(idx);
    this.form = this.helpService.toFormGroup(this.questions);
  }

  onSubmit() {
    // console.log(JSON.stringify(this.form.value));
    alert('该功能暂未完全实现，敬请期待');
  }

}

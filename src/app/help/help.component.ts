import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { flyIn } from '../animations/fly-in';
import { Subscription } from 'rxjs/Subscription';

import { QuestionBase } from '../models/questions/question-base-model';
import { SelectorMatcher } from '@angular/compiler';

import { HelpService } from './help.service';


@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: [flyIn]
})
export class HelpComponent implements OnInit {

  description: string;
  helpType: any[] = [
    { name: '意见反馈', idx: 0 },
    { name: '活动反馈', idx: 1 }
  ];
  form: FormGroup;
  questions: any[];
  selectHelpType: number;
  edata: any;

  constructor(
    private helpService: HelpService
  ) { }

  ngOnInit() {
    this.edata = JSON.parse(localStorage.getItem('feedbackAct'));
    console.log(this.edata);
    if (this.edata) {
      localStorage.removeItem('feedbackAct');
      this.selectHelpType = 1;
    }else {
      this.selectHelpType = 0;
    }
    this.questions = this.helpService.getQuestions(this.selectHelpType);
    this.form = this.helpService.toFormGroup(this.questions);
    if (this.edata) {
      this.form.patchValue({
        actId: this.edata.eid,
        actName: this.edata.ename
      });
    }
  }

  changeForm(idx) {
    this.questions = this.helpService.getQuestions(idx);
    this.form = this.helpService.toFormGroup(this.questions);
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
  }

}

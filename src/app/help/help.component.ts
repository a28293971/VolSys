import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { flyIn } from '../animations/fly-in';
import { Subscription } from 'rxjs/Subscription';

import { QuestionBase } from '../models/questions/question-base-model';
import { TextboxQuestion } from '../models/questions/question-textbox';
import { TextareaQuestion } from '../models/questions/question-textarea';
import { SelectorMatcher } from '@angular/compiler';


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
  questions: any[] = [
    [new TextboxQuestion({
      key: 'question',
      label: '问题简述',
      required: true
    }),
    new TextareaQuestion({
      key: 'description',
      label: '详细描述',
      required: true
    })],
    [new TextboxQuestion({
      key: 'actName',
      label: '活动名称',
      required: true
    }),
    new TextboxQuestion({
      key: 'question',
      label: '问题简述',
      required: true
    }),
    new TextareaQuestion({
      key: 'description',
      label: '详细描述',
      required: true
    })]
  ];
  selectHelpType: number;

  constructor() { }

  ngOnInit() {
    this.selectHelpType = 0;
    this.form = this.toFormGroup(this.questions[0]);
  }

  toFormGroup(questions: QuestionBase[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  changeForm(idx) {
    this.form = this.toFormGroup(this.questions[idx]);
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
  }

}

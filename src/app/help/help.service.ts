import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionBase } from '../models/questions/question-base-model';
import { TextboxQuestion } from '../models/questions/question-textbox';
import { TextareaQuestion } from '../models/questions/question-textarea';

import { User } from '../models/user-model';
import { CurrentUser } from '../common/services/currentUser.data';

@Injectable()
export class HelpService {

  public currentUser: User
  private questions: any[] = [
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
      key: 'actId',
      label: '活动ID',
      required: true
    }),
      new TextboxQuestion({
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

  constructor(
    private CUser: CurrentUser
  ) {
    this.currentUser = this.CUser.user;
    this.CUser.currentUser.subscribe(data => this.currentUser = data);
  }

  getQuestions(idx: number) {
    return this.questions[idx];
  }

  toFormGroup(questions: QuestionBase[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

}

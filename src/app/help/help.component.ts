import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { flyIn } from '../animations/fly-in';

import { QuestionBase } from '../models/questions/question-base-model';
import { TextboxQuestion } from '../models/questions/question-textbox';
import { TextareaQuestion } from '../models/questions/question-textarea';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  animations: [flyIn]
})
export class HelpComponent implements OnInit {

  description: string;
  form: FormGroup;
  questions: any[] = [
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
    })
  ]

  constructor() { }

  ngOnInit() {
    this.form = this.toFormGroup(this.questions);
  }

  toFormGroup(questions: QuestionBase[] ) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  onSubmit() {
    console.log(JSON.stringify(this.form.value));
  }

}

import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../../models/questions/question-base-model';

@Component({
  selector: 'dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {

  @Input() question: QuestionBase;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

}

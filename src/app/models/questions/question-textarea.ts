import { QuestionBase } from './question-base-model';

export class TextareaQuestion extends QuestionBase {
  controlType = 'textarea';
  type: string;

  constructor(options: {} = {}) {
    super(options);
  }
}

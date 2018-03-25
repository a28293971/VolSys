import { QuestionBase } from './question-base-model';

export class TextboxQuestion extends QuestionBase {
  controlType = 'textbox';

  constructor(options: {} = {}) {
    super(options);
  }
}

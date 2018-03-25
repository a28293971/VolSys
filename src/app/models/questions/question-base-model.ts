export class QuestionBase {
    controlType: string;
    value: string;
    key: string;
    label: string;
    required: boolean;
    constructor(options: {
        controlType?: string
        value?: string;
        key?: string;
        label?: string;
        required?: boolean;
    } = {}) {
        this.controlType = options.controlType || '';
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
    }
}

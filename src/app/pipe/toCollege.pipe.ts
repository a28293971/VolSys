import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toCollege'})
export class ToCollege implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case '274': return '计算机科学与技术学院';
            case '024': return '政治与公共管理学院';
            case '304': return '医学部';
            case '224': return '物理·光电与能源学部';
            case '064': return '体育学院';
            case '034': return '社会学院';
            case '134': return '沙钢钢铁学院';
            case '144': return '纳米科学技术学院';
            case '184': return '教育学院';
            case '294': return '机电工程学院';
            case '474': return '轨道交通学院';
            case '154': return '纺织与服装工程学院';
            case '104': return '东吴商学院';
            case '284': return '电子信息学院';
            case '484': return '传媒学院';
            case '094': return '材料与化学化工学部';
        }
    }
}

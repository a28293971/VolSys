import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toCollege'})
export class ToCollege implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case "2740": return '计算机科学与技术学院';
            // case 2: return '物理·光电与能源学部';
        }
    }
}

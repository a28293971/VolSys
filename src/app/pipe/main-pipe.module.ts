import { NgModule } from '@angular/core';
import { ToCollege } from './toCollege.pipe';
import { ShowEnterHtmllPipe } from './showEnterHtml.pipe';

@NgModule({
    declarations: [
        ToCollege,
        ShowEnterHtmllPipe
    ],
    imports: [],
    exports: [
        ToCollege,
        ShowEnterHtmllPipe
    ]
})
export class MainPipe {}

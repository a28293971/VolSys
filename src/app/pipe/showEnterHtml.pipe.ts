import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'showEnterHtml'
})
export class ShowEnterHtmllPipe implements PipeTransform {

  constructor(
    private domSanitizer: DomSanitizer
  ) {}

  transform(value: string): any {
    value = value.replace(/\n/g, "<br/>").replace(/\s/g, "&nbsp;");
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }

}

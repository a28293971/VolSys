import { Component, OnInit } from '@angular/core';
import { MsgService } from './msg.service';

@Component({
  selector: 'msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {

  msgList: any[] = [];

  constructor(
    private msgService: MsgService
  ) { }

  ngOnInit() {
    this.msgService.getMsgList()
    .subscribe(data => this.msgList = data.json().msg);
  }

  loadData(event) {
    this.msgService.getMsgList()
    .subscribe(
      data => {
        let ls = data.json().msg;
        for (let i = 0; i < ls.length; i++) {
          this.msgList.push(ls[i]);
        }
      },
      error => console.log(error)
    );
  }

}

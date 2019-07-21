import { Component, OnInit } from '@angular/core';
import { MsgService } from './msg.service';

@Component({
  selector: 'msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent implements OnInit {
  // public totalRecords: number;
  msgList: any[] = [];

  constructor(
    private msgService: MsgService
  ) { }

  ngOnInit() {
    this.msgService.getMsgList()
    .subscribe(data => this.msgList = data.json().data.msgs);
  }

  loadData(event) {
    this.msgService.getMsgList()
    .subscribe(
      data => {
        let ls = data.json().data.msgs;
        for (let i = 0; i < ls.length; i++) {
          this.msgList.push(ls[i]);
        }
      },
      error => console.error(error)
    );
  }

}

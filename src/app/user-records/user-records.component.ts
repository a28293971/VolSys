import { Component, OnInit } from '@angular/core';
import { flyIn } from '../animations/fly-in';

import{ UserRecordsService } from './user-records.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.scss'],
  animations: [flyIn]
})
export class UserRecordsComponent implements OnInit {
  public displayDaya: any[] = [];
  public selected: string = '0000';
  public selectMenu = [
    { name: '请选择', val: '0000' },
    { name: '2015级', val: '15' },
    { name: '2016级', val: '16' },
    { name: '2017级', val: '17' },
    { name: '2018级', val: '18' }
  ]
  private allGradeRecords = {};
  public col = [
    { field: 'id', header: '学号' },
    { field: 'name', header: '姓名' },
    { field: 'volunteer_time.9', header: '9月' },
    { field: 'volunteer_time.10', header: '10月' },
    { field: 'volunteer_time.11', header: '11月' },
    { field: 'volunteer_time.12', header: '12月' },
    { field: 'volunteer_time.1', header: '1月' },
    { field: 'volunteer_time.2', header: '2月' },
    { field: 'volunteer_time.3', header: '3月' },
    { field: 'volunteer_time.4', header: '4月' },
    { field: 'volunteer_time.5', header: '5月' },
    { field: 'volunteer_time.6', header: '6月' },
    { field: 'volunteer_time.7', header: '7月' },
    { field: 'volunteer_time.8', header: '8月' },
    { field: 'volunteer_time.0', header: '志愿时间' },
  ];
  public exportName = 'volTime' + new Date().toLocaleString();

  constructor(
    private userRecordsService: UserRecordsService
  ) { }

  ngOnInit() {
    for (const it of this.selectMenu.slice(1, this.selectMenu.length)) {
      let tmp = localStorage.getItem('userRecords' + it.val);
      if (tmp) {
        this.allGradeRecords[it.val] = JSON.parse(CryptoJS.AES.decrypt(tmp, 'records').toString(CryptoJS.enc.Utf8));
      }
    }
  }

  selectChanged(val) {
    if (val === '0000') {
      return;
    }

    // console.log(val);
    if (this.allGradeRecords[val]) {
      this.displayDaya = this.allGradeRecords[val];
    }else {
      let tmp = localStorage.getItem('userRecords' + val);
      if (tmp) {
        this.allGradeRecords[val] = JSON.parse(CryptoJS.AES.decrypt(tmp, 'records').toString(CryptoJS.enc.Utf8));
        this.displayDaya = this.allGradeRecords[val];
      }else {
        this.userRecordsService.getUserRecords(val)
        .subscribe(
          data => {
            if (data.json().sysinfo.getUserRecords) {
              this.allGradeRecords[val] = data.json().data;
              this.displayDaya = this.allGradeRecords[val];
              localStorage.setItem('userRecords' + val, CryptoJS.AES.encrypt(JSON.stringify(this.displayDaya), 'records').toString());
            } else {
              alert('获取用户信息失败');
            }
          },
          error => console.error(error)
        );
      }
    }
  }

  canIExport() {
    if (this.selected === '0000') {
      return false;
    }
    return true;
  }

}

import { Component, OnInit } from '@angular/core';
import { FooterInfoComponent } from '../footer-info/footer-info.component';

import { User } from '../models/user-model';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public dataL: {};
  public dataB: {};
  public ranklist: any[];
  public currentUser: User;

  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.dataL = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'VolTime',
              data: [0, 0, 8, 8, 18, 20, 36],
              fill: false,
              borderColor: '#2ea700',
          },
          {
              label: 'Score',
              data: [3, 7.8, 9.2, 14, 27, 30.7, 33],
              fill: false,
              borderColor: '#a83d3b'
          }
      ]
    };
    this.dataB = {
      labels: ['王大木', '李光光', '王太木', '呵呵哒', '六大洋', '233', '666', '张大哥', '王小星', '牛大力'],
      datasets: [
          {
              label: 'VolTime',
              data: [188, 172, 156, 138, 120, 99 , 89, 56.6, 37.2, 18],
              fill: false,
              borderColor: '#2ea700',
              backgroundColor: '#2ea700'
          }
      ]
    };
  }

  trackById(idx, stu) {
    return stu.di;
  }

}

import { Component, OnInit } from '@angular/core';
import { FooterInfoComponent } from '../footer-info/footer-info.component';

import { User } from '../models/user-model';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public data: {};
  public ranklist: any[];
  public currentUser: User;

  constructor() { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.data = {
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
    this.ranklist = [
      { name: "王大木", id: "1530286493", volunteer_time: 188},
      { name: "李光光", id: "1530242363", volunteer_time: 99},
      { name: "王太木", id: "1537326493", volunteer_time: 56.6},
      { name: "呵呵哒", id: "1690286493", volunteer_time: 37.2},
      { name: "六大洋", id: "1583286493", volunteer_time: 18}
    ];
  }

  trackById(idx, stu) {
    return stu.di;
  }

}

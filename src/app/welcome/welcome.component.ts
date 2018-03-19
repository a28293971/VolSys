import { Component, OnInit } from '@angular/core';

import { User } from '../models/user-model';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  public data: {};
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
              borderColor: '#dcea00'
          }
      ]
    }
  }

}

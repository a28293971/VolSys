import { Injectable } from '@angular/core';
import { User } from '../../models/user-model';

@Injectable()
export class CurrentUser {

  public currentUser: User

  constructor(

  ) {
      // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  update() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}

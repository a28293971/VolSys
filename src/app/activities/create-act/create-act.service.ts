import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Activity } from '../../models/activity-model';
import { concat } from 'rxjs/operators/concat';
import { Route } from '@angular/router/src/config';

@Injectable()
export class CreateActService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  create(act: Activity) {
    console.log('had created new act');
    console.log(act);
    this.router.navigateByUrl('/workspace/act/activities');
  }

}

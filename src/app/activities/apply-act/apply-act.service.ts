import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { ApplyAct } from '../../models/apply-model';

@Injectable()
export class ApplyActService {

  constructor(
    private http: Http,
    private router: Router
  ) { }

  apply(act: ApplyAct) {
    console.log('had applied new act');
    console.log(act);
    this.router.navigateByUrl('/workspace/act/activities');
  }

}

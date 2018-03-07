import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ApproveService {

  constructor(
    private http: Http
  ) { }

  getNeedApproveActivities(rows: number = 10) {
    return this.http.get('/mock-data/activities.json');
  }

}

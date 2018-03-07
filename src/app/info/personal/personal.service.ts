import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class PersonalService {

  constructor(
    private http: Http
  ) { }

  getVolTime(id: number) {
    return this.http.get('/mock-data/userVolTime.json');
  }

  getAcceptedActivities() {
    return this.http.get('/mock-data/activities-accepted.json');
  }

  getWaitingActivities() {
    return this.http.get('/mock-data/activities-waiting.json');
  }

}

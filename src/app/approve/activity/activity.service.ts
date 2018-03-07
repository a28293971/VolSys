import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ActivityService {

  constructor(
    private http: Http
  ) { }

  getActivityMembers(id: number) {
    return this.http.get('/mock-data/act-' + id + '.json').map((res: Response) => res.json());
  }

}

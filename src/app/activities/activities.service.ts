import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class ActivityService {

    constructor(private http: Http) {}

    getActivities(rows: number = 10) {
        return this.http.get('/mock-data/activities.json');
    }
}
